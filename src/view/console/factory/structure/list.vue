<script lang="ts" setup>
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'

import { APanel, ATable } from '@airpower/web'
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
    <AToolBar
      :entity="StructureEntity"
      :loading="isLoading"
      :service="StructureService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :entity="StructureEntity"
      ctrl-width="130"
      show-add
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
