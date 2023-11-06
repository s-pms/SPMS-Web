<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PermissionEntity"
      :service="PermissionService"
      @on-add="onAdd()"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :entity="PermissionEntity"
      :ctrl-width="105"
      show-add
      :default-expand-all="false"
      :disable-delete="(row: PermissionEntity) => row.isSystem"
      :disable-edit="(row: PermissionEntity) => row.isSystem"
      :disable-add="(row: PermissionEntity) => row.isSystem"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { PermissionEditor } from './component'
import { useAirTableTree } from '@/airpower/hook/useAirTableTree'
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
<style scoped lang="scss"></style>
