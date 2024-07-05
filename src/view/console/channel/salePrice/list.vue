<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SalePriceEntity"
      :service="SalePriceService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SalePriceEntity"
      :select-list="selectList"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
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
import { SalePriceEditor } from './component'
import { SalePriceEntity } from '@/model/channel/salePrice/SalePriceEntity'
import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(SalePriceEntity, SalePriceService, {
  editView: SalePriceEditor,
})

</script>
<style scoped lang="scss"></style>
