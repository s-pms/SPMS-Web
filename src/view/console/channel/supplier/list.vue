<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { SupplierEditor } from './component'

const hook = useMyTable(SupplierService, {
  editView: SupplierEditor,
})
</script>

<template>
  <APanel>
    <ATable :use-hook="hook" />
  </APanel>
</template>

<style lang="scss" scoped></style>
