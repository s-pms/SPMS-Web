<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { ParameterEditor } from './component'

const hook = useMyTable(ParameterService, {
  editView: ParameterEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.isSystem"
      :disable-edit="(row) => row.isSystem"
      :use-hook="hook"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
