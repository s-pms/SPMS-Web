<script lang="ts" setup>
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { APage, APanel, ATable, ATablePayload, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { SupplierDetail } from '../supplier/component'
import { PurchasePriceEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(PurchasePriceService, {
    editView: PurchasePriceEditor,
  })
</script>

<template>
  <APanel>
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
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #supplier="{ data }">
        <ATablePayload
          :payload="data.supplier"
          :view="SupplierDetail"
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

<style lang="scss" scoped></style>
