<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="MenuEntity"
      :service="MenuService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      show-add
      :entity="MenuEntity"
      :ctrl-width="130"
      :disable-delete="row => row.children.length > 0"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onAddRow"
    />
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTableTree } from '@/airpower/hook/useAirTableTree'
import { MenuEditor } from './component'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

const {
  list, isLoading,
  onAddRow, onAdd, onDelete, onEdit, onSearch,
} = useAirTableTree(MenuEntity, MenuService, {
  editView: MenuEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>
<style scoped lang="scss"></style>
