<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { OperationService } from '@/model/mes/operation/OperationService'
import { OperationEditor } from './component'

const hook = useMyTable(OperationService, {
  editView: OperationEditor,
})
</script>

<template>
  <APanel>
    <ATable :use-hook="hook" />
  </APanel>
</template>

<style lang="scss" scoped></style>
