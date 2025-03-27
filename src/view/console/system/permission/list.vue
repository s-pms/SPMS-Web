<template>
  <APanel>
    <AToolBar
      :entity="PermissionEntity"
      :loading="isLoading"
      :service="PermissionService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="list"
      :default-expand-all="false"
      :disable-add="row => row.isSystem"
      :disable-delete="row => row.isSystem"
      :disable-edit="row => row.isSystem"
      :entity="PermissionEntity"
      show-add
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar,
} from '@airpower/component'
import { useAirTableTree } from '@airpower/hook/useAirTableTree'
import { PermissionEditor } from './component'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

const {
  isLoading, list,
  onEdit, onAdd, onAddRow, onSearch, onDelete,
} = useAirTableTree(PermissionEntity, PermissionService, {
  editView: PermissionEditor,
  beforeAddRow: (param: PermissionEntity, row: PermissionEntity) => {
    param.parent = row
    return param
  },
})
</script>
<style lang="scss" scoped></style>
