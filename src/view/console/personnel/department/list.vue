<script lang="ts" setup>
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

import { APanel, ATable } from '@airpower/web'
import { DepartmentEditor } from './component'

const {
  list,
  isLoading,
  onAddRow,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
} = useTableTree(DepartmentService, {
  editView: DepartmentEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="DepartmentEntity"
      :loading="isLoading"
      :service="DepartmentService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :disable-delete="(row) => row.children.length > 0"
      :entity="DepartmentEntity"
      ctrl-width="130"
      show-add
      @edit="onEdit"
      @delete="onDelete"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
