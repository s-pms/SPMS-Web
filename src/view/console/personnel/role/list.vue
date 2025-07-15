<script lang="ts" setup>
import {useMyTable} from '@/hook/useMyTable'
import type {RoleEntity} from '@/model/personnel/role/RoleEntity'
import {RoleService} from '@/model/personnel/role/RoleService'
import {AButton, APanel, ATable, DialogUtil} from '@airpower/web'
import {RoleEditor, RoleMenuEditor, RolePermissionEditor} from './component'

async function onMenuEditor(role: RoleEntity) {
  DialogUtil.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  DialogUtil.show(RolePermissionEditor, role)
}

const hook = useMyTable(RoleService, {
  editView: RoleEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
      ctrl-width="160"
    >
      <template #customRow="{ data }">
        <AButton
          link
          @click="onMenuEditor(data)"
        >
          菜单
        </AButton>
        <AButton
          link
          @click="onPermissionEditor(data)"
        >
          权限
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
