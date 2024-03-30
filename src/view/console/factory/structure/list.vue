<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="StructureEntity"
      :service="StructureService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :entity="StructureEntity"
      show-add
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { StructureEditor } from './component'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { useAirTableTree } from '@/airpower/hook/useAirTableTree'

const {
  isLoading,
  list,
  onSearch, onAdd, onDelete, onEdit, onSortChanged, onSelected, onAddRow,
} = useAirTableTree(StructureEntity, StructureService, {
  editView: StructureEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})

</script>
<style scoped lang="scss"></style>
