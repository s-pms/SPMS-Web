<script lang="ts" setup>
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

import { APanel, ATable } from '@airpower/web'
import { PermissionEditor } from './component'

const {
  isLoading,
  list,
  onEdit,
  onAdd,
  onAddRow,
  onSearch,
  onDelete,
} = useTableTree(PermissionService, {
  editView: PermissionEditor,
  beforeAddRow: (param: PermissionEntity, row: PermissionEntity) => {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="PermissionEntity"
      :loading="isLoading"
      :service="PermissionService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :default-expand-all="false"
      :disable-add="(row) => row.isSystem"
      :disable-delete="(row) => row.isSystem"
      :disable-edit="(row) => row.isSystem"
      :entity="PermissionEntity"
      ctrl-width="130"
      show-add
      @edit="onEdit"
      @delete="onDelete"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
