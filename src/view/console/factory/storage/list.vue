<script lang="ts" setup>
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTableTree } from '@airpower/hook/useAirTableTree'
import { StorageEditor } from './component'

const { isLoading, list, onSearch, onAdd, onDelete, onEdit, onSortChanged, onSelected, onAddRow } = useAirTableTree(
  StorageEntity,
  StorageService,
  {
    editView: StorageEditor,
    beforeAddRow(param, row) {
      param.parent = row
      return param
    },
  },
)
</script>

<template>
  <APanel>
    <AToolBar
      :entity="StorageEntity"
      :loading="isLoading"
      :service="StorageService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="list"
      :entity="StorageEntity"
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
