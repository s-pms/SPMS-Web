<script lang="ts" setup>
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

import { APage, APanel, ATable } from '@airpower/web'
import { CustomerEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useTable(CustomerService, {
    editView: CustomerEditor,
  })
</script>

<template>
  <APanel title="">
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
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
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
