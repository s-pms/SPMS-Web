<script lang="ts" setup>
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

import { APanel, ATable, useTableTree } from '@airpower/web'
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
    <ATable
      v-loading="isLoading"
      :data-list="list"
      :disable-delete="(row) => row.children.length > 0"
      :entity="MenuEntity"
      :service="MenuService"
      ctrl-width="130"
      show-add
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @add-row="onAddRow"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
