<template>
  <AFrame :menu-list="menuList">
    <template #logo>
      <img
        :src="airpower"
        height="30"
      >
    </template>
    <template #user>
      <AUser :user="currentUserInfo">
        <div>
          <AImage :src="currentUserInfo.avatar" />
        </div>
        <AInput
          v-model.nickname="currentUserInfo.nickname"
          :tree="menuList"
          :entity="UserEntity"
        />
        <template #setting>
          可选插槽
        </template>
      </AUser>
    </template>
    <router-view />
  </AFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  AFrame, AUser, AImage, AInput,
} from '@/airpower/component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirClassTransformer } from '@/airpower/helper/AirClassTransformer'
import airpower from '@/airpower/assets/img/airpower.png'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { MenuEntity } from '@/model/system/menu/MenuEntity'

const currentUserInfo = ref(new UserEntity())
const menuList = ref([] as MenuEntity[])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading).getMyMenuList()
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value = await UserService.create().getMyInfo()
  AirConfig.permissionList = []

  const permissionList = await UserService.create(isLoading).getMyPermissionList()
  AirConfig.permissionList = AirClassTransformer.treeList2List(permissionList).map((item) => item.identity)
  await getMenuList()

  AirWebsocket.create({
    onmessage(message) {
      // eslint-disable-next-line no-console
      console.log(message)
    },
    onopen() {
      AirNotification.success('Websocket连接成功')
    },
  })
}

init()
</script>
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
}
</style>
