<script lang="ts" setup>
import { StorageService } from '@/model/factory/storage/StorageService'

import { APanel, ATable, useTableTree } from '@airpower/web'
import { StorageEditor } from './component'

const hook = useTableTree(StorageService, {
  editView: StorageEditor,
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
