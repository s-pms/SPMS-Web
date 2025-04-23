<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'

import { AButton, APage, APanel, ATable, DialogUtil, useTable } from '@airpower/web'
import { RoleEditor, RoleMenuEditor, RolePermissionEditor } from './component'

async function onMenuEditor(role: RoleEntity) {
  DialogUtil.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  DialogUtil.show(RolePermissionEditor, role)
}

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onPageChanged,
} = useTable(RoleService, {
  editView: RoleEditor,
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="RoleEntity"
      :loading="isLoading"
      :service="RoleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="RoleEntity"
      ctrl-width="160"
      @edit="onEdit"
      @delete="onDelete"
    >
      <template #customRow="{ data }">
        <AButton
          link-button
          tooltip="授权菜单"
          type="CONFIRM"
          @click="onMenuEditor(data)"
        >
          菜单
        </AButton>
        <AButton
          link-button
          tooltip="授权权限"
          type="LOCK"
          @click="onPermissionEditor(data)"
        >
          权限
        </AButton>
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
