<script lang="ts" setup>
import { StructureService } from '@/model/factory/structure/StructureService'

import { APanel, ATable, useTableTree } from '@airpower/web'
import { StructureEditor } from './component'

const hook = useTableTree(StructureService, {
  editView: StructureEditor,
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
