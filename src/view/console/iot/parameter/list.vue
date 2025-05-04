<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'

import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { APanel, ATable } from '@airpower/web'
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
