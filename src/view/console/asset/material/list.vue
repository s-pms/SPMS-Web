<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { APanel, ATable } from '@airpower/web'
import { MaterialEditor } from './component'
</script>

<template>
  <APanel>
    <ATable
      :use-hook="useMyTable(MaterialService, {
        editView: MaterialEditor,
      })"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
