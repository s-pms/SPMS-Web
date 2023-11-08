<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PurchasePriceEntity"
      :service="PurchasePriceService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PurchasePriceEntity"
      :select-list="selectList"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #materialCode="row">
        {{ (row.data as PurchasePriceEntity).material.code }}
      </template>
      <template #materialName="row">
        {{ (row.data as PurchasePriceEntity).material.name }}
      </template>
      <template #supplierCode="row">
        {{ (row.data as PurchasePriceEntity).supplier.code }}
      </template>
      <template #supplierName="row">
        {{ (row.data as PurchasePriceEntity).supplier.name }}
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

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { PurchasePriceEditor } from './component'
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(PurchasePriceEntity, PurchasePriceService, {
  editView: PurchasePriceEditor,
})

</script>
<style scoped lang="scss"></style>
