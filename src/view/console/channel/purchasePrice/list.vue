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
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #supplier="{ data }">
        <ATablePayload
          :view="SupplierDetail"
          :payload="data.supplier"
        />
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar,
  ATablePayload,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { PurchasePriceEditor } from './component'
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { SupplierDetail } from '../supplier/component'

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
