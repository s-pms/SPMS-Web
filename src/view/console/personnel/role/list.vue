<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="RoleEntity"
      :service="RoleService"
      @on-add="onAdd()"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="RoleEntity"
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
    >
      <template #customRow="row">
        <AButton
          type="CONFIRM"
          tooltip="授权菜单"
          icon-button
          @click="onMenuEditor(row.data)"
        />
        <AButton
          type="LOCK"
          tooltip="授权权限"
          icon-button
          @click="onPermissionEditor(row.data)"
        />
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

<script lang="ts" setup>
import {
  AButton,
  APage,
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleEditor, RoleMenuEditor, RolePermissionEditor } from './component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'

async function onMenuEditor(role: RoleEntity) {
  AirDialog.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  AirDialog.show(RolePermissionEditor, role)
}

const {
  isLoading, response,
  onSearch, onAdd, onEdit, onDelete, onPageChanged,
} = useAirTable(RoleEntity, RoleService, {
  editView: RoleEditor,
})
</script>
<style scoped lang="scss"></style>
