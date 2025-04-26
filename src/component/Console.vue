<script lang="ts" setup>
import type { MenuEntity } from '@/model/system/menu/MenuEntity'
import UserCard from '@/component/UserCard.vue'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { AFrame, PermissionUtil, RouterUtil } from '@airpower/web'
import { ref } from 'vue'

const components = import.meta.glob('/src/view/**/*.vue')

const currentUserInfo = ref(new UserEntity())
const menuList = ref<MenuEntity[]>([])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading).getMyMenuList()
  RouterUtil.initVueRouter(menuList.value, components, '/src/view', 'console')
}

async function init() {
  currentUserInfo.value = await UserService.create().getMyInfo()
  let permissions = PermissionUtil.getList()
  if (permissions.length === 0) {
    permissions = await UserService.create(isLoading).getMyPermissionList()
  }
  PermissionUtil.saveList(permissions)
  await getMenuList()
}

init()
</script>

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

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  color: white;
  margin-top: 5px;
}
</style>
