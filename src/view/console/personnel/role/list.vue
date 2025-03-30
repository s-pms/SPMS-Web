<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { AButton, APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirTable } from '@airpower/hook/useAirTable'
import { RoleEditor, RoleMenuEditor, RolePermissionEditor } from './component'

async function onMenuEditor(role: RoleEntity) {
  AirDialog.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  AirDialog.show(RolePermissionEditor, role)
}

const { isLoading, response, onSearch, onAdd, onEdit, onDelete, onPageChanged } = useAirTable(RoleEntity, RoleService, {
  editView: RoleEditor,
})
</script>

<template>
  <APanel>
    <AToolBar
      :entity="RoleEntity"
      :loading="isLoading"
      :service="RoleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :entity="RoleEntity"
      @on-edit="onEdit"
      @on-delete="onDelete"
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
