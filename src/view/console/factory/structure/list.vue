<script lang="ts" setup>
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'

import { APanel, ATable, useTableTree } from '@airpower/web'
import { StructureEditor } from './component'

const {
  isLoading,
  list,
  onSearch,
  onAdd,
  onDelete,
  onEdit,
  onSortChanged,
  onSelected,
  onAddRow,
} = useTableTree(StructureService, {
  editView: StructureEditor,
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
      :entity="StructureEntity"
      :service="StructureService"
      ctrl-width="130"
      show-add
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
