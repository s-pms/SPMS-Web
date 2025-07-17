<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'
import { SalePriceEditor } from './component'

const hook = useMyTable(SalePriceService, {
  editView: SalePriceEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
    >
      <template #materialCode="{ data }">
        {{ data.material.code }}
      </template>
      <template #materialName="{ data }">
        {{ data.material.name }}
      </template>
      <template #customerCode="{ data }">
        {{ data.customer.code }}
      </template>
      <template #customerName="{ data }">
        {{ data.customer.name }}
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
