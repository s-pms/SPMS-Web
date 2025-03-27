<template>
  <AFrame
    :header-height="50"
    :menu-list="menuList"
  >
    <template #logo>
      <img
        class="logo"
        height="40"
        src="@/assets/img/logo.svg"
      >
    </template>
    <template #user>
      <UserCard :user="currentUserInfo" />
    </template>
    <router-view />
  </AFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AFrame } from '@airpower/component'
import { AirRouter } from '@airpower/helper/AirRouter'
import { AirPermission } from '@airpower/helper/AirPermission'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import UserCard from '@/component/UserCard.vue'

const currentUserInfo = ref(new UserEntity())
const menuList = ref<MenuEntity[]>([])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading)
    .getMyMenuList()
  console.log(menuList.value)
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
  margin-top: 5px;
}
</style>
