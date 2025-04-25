<script lang="ts" setup>
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

import { APanel, ATable, useTableTree } from '@airpower/web'
import { StorageEditor } from './component'

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
} = useTableTree(StorageService, {
  editView: StorageEditor,
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
      :entity="StorageEntity"
      :service="StorageService"
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
