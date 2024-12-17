<template>
  <AFrame
    :menu-list="menuList"
    :unique-opened="false"
  >
    <template #logo>
      <img
        src="@/assets/img/logo.svg"
        style="height: 100%;"
      >
    </template>
    <template #user>
      <AUser :user="currentUserInfo">
        <div>
          <AImage :src="currentUserInfo.avatar" />
        </div>
        <AInput
          v-model.nickname="currentUserInfo.nickname"
          :entity="UserEntity"
          :tree="menuList"
        />
      </AUser>
    </template>
    <router-view />
  </AFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  AFrame, AImage, AInput, AUser,
} from '@/airpower/component'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { AirPermission } from '@/airpower/helper/AirPermission'

const currentUserInfo = ref(new UserEntity())
const menuList = ref<MenuEntity[]>([])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading)
    .getMyMenuList()
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value = await UserService.create()
    .getMyInfo()
  let permissions = AirPermission.getList()
  if (permissions.length === 0) {
    permissions = await UserService.create(isLoading)
      .getMyPermissionList()
  }
  AirPermission.saveList(permissions)
  await getMenuList()
}

init()
</script>
<style lang="scss" scoped>
.logo {
  text-decoration: none;
  color: white;
}
</style>
