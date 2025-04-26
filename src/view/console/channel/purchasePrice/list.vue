<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'

import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { APage, APanel, APayload, ATable } from '@airpower/web'
import { SupplierDetail } from '../supplier/component'
import { PurchasePriceEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(PurchasePriceService, {
    editView: PurchasePriceEditor,
  })
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PurchasePriceEntity"
      :select-list="selectList"
      :service="PurchasePriceService"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
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
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
