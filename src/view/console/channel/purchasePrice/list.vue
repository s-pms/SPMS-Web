<script lang="ts" setup>
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'

import { APage, APanel, ATable, useTable } from '@airpower/web'
// todo import { SupplierDetail } from '../supplier/component'
import { PurchasePriceEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useTable(PurchasePriceService, {
    editView: PurchasePriceEditor,
  })
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="PurchasePriceEntity"
      :loading="isLoading"
      :service="PurchasePriceService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PurchasePriceEntity"
      :select-list="selectList"
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
