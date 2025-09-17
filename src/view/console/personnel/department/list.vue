<script lang="ts" setup>
import { APanel, ATable, useTableTree } from '@airpower/web'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'
import { DepartmentEditor } from './component'

const hook = useTableTree(DepartmentService, {
  editView: DepartmentEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.children.length > 0"
      :use-hook="hook"
      ctrl-width="130"
      is-tree
      show-add-row
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
