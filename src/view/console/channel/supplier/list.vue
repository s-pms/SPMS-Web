<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'

import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { APage, APanel, ATable } from '@airpower/web'
import { SupplierEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(SupplierService, {
  editView: SupplierEditor,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SupplierEntity"
      :select-list="selectList"
      :service="SupplierService"
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
