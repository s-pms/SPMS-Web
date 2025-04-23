<script lang="ts" setup>
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

import { APanel, ATable } from '@airpower/web'
import { MenuEditor } from './component'

const {
  list,
  isLoading,
  onAddRow,
  onAdd,
  onDelete,
  onEdit,
  onSearch,
} = useTableTree(MenuService, {
  editView: MenuEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="MenuEntity"
      :loading="isLoading"
      :service="MenuService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :disable-delete="(row) => row.children.length > 0"
      :entity="MenuEntity"
      ctrl-width="130"
      show-add
      @edit="onEdit"
      @delete="onDelete"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
