<script lang="ts" setup>
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

import { APanel, ATable, useTableTree } from '@airpower/web'
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
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :disable-delete="(row) => row.children.length > 0"
      :entity="DepartmentEntity"
      :service="DepartmentService"
      ctrl-width="130"
      show-add
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
