<script lang="ts" setup>
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTableTree } from '@airpower/hook/useAirTableTree'
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
} = useAirTableTree(StructureService, {
  editView: StructureEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel>
    <AToolBar
      :entity="StructureEntity"
      :loading="isLoading"
      :service="StructureService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="list"
      :entity="StructureEntity"
      show-add
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
