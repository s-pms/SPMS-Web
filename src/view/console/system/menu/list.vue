<script lang="ts" setup>
import {MenuService} from '@/model/system/menu/MenuService'
import {APanel, ATable, useTableTree} from '@airpower/web'
import {MenuEditor} from './component'

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
      show-add-row
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
