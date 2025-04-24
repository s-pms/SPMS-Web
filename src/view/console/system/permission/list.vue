<script lang="ts" setup>
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

import { APanel, ATable, useTableTree } from '@airpower/web'
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
    <ATable
      :service="PermissionService"
      @add="onAdd"
      @search="onSearch"
      v-loading="isLoading"
      :data-list="list"
      :default-expand-all="false"
      :disable-add-row="(row) => row.isSystem"
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
