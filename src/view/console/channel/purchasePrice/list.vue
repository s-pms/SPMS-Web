<script lang="ts" setup>
import {useMyTable} from '@/hook/useMyTable'
import {PurchasePriceService} from '@/model/channel/purchasePrice/PurchasePriceService'
import {APanel, APayload, ATable} from '@airpower/web'
import {SupplierDetail} from '../supplier/component'
import {PurchasePriceEditor} from './component'

const hook = useMyTable(PurchasePriceService, {
  editView: PurchasePriceEditor,
})
</script>

<template>
  <APanel>
    <ATable :use-hook="hook">
      <template #supplier="row">
        <APayload :payload="row.data.supplier" :view="SupplierDetail" />
      </template>
      <template #materialCode="{ data }">
        {{ data.material.code }}
      </template>
      <template #materialName="{ data }">
        {{ data.material.name }}
      </template>
      <template #supplierCode="{ data }">
        {{ data.supplier.code }}
      </template>
      <template #supplierName="{ data }">
        {{ data.supplier.name }}
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
