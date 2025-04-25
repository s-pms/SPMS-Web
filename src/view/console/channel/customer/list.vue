<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'

import { CustomerService } from '@/model/channel/customer/CustomerService'
import { APage, APanel, ATable } from '@airpower/web'
import { CustomerEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(CustomerService, {
  editView: CustomerEditor,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="CustomerEntity"
      :select-list="selectList"
      :service="CustomerService"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
