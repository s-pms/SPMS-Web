<script lang="ts" setup>
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'
import { APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTableTree } from '@airpower/hook/useAirTableTree'
import { DepartmentEditor } from './component'

const {
  list,
  isLoading,
  onAddRow,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
} = useAirTableTree(DepartmentService, {
  editView: DepartmentEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel>
    <AToolBar
      :entity="DepartmentEntity"
      :loading="isLoading"
      :service="DepartmentService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="list"
      :disable-delete="(row) => row.children.length > 0"
      :entity="DepartmentEntity"
      show-add
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
