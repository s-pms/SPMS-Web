<script lang="ts" setup>
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { CustomerEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(CustomerService, {
    editView: CustomerEditor,
  })
</script>

<template>
  <APanel>
    <AToolBar
      :entity="CustomerEntity"
      :loading="isLoading"
      :service="CustomerService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="CustomerEntity"
      :select-list="selectList"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
