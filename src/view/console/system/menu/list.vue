<script lang="ts" setup>
import { APanel, ATable, useTableTree } from '@airpower/web'
import { MenuService } from '@/model/system/menu/MenuService'
import { MenuEditor } from './component'

const hook = useTableTree(MenuService, {
  editView: MenuEditor,
  beforeAddRow(param, row) {
    param.parent = row
    return param
  },
})
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.children.length > 0"
      :use-hook="hook"
      ctrl-width="130"
      is-tree
      show-add-row
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
