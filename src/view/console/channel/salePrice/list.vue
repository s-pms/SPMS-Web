<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { SalePriceEntity } from '@/model/channel/salePrice/SalePriceEntity'

import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'
import { APage, APanel, ATable } from '@airpower/web'
import { SalePriceEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(SalePriceService, {
    editView: SalePriceEditor,
  })
</script>

<template>
  <APanel title="">
    <ATable
      :service="SalePriceService"
      @add="onAdd"
      @search="onSearch"
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SalePriceEntity"
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

<style lang="scss" scoped></style>
