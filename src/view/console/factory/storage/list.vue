<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="StorageEntity"
      :service="StorageService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :entity="StorageEntity"
      show-add
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { StorageEditor } from './component'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { useAirTableTree } from '@/airpower/hook/useAirTableTree'

const {
  isLoading,
  list,
  onSearch, onAdd, onDelete, onEdit, onSortChanged, onSelected, onAddRow,
} = useAirTableTree(StorageEntity, StorageService, {
  editView: StorageEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})

</script>
<style scoped lang="scss"></style>
