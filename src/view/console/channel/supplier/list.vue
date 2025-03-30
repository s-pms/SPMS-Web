<script lang="ts" setup>
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { SupplierEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(SupplierEntity, SupplierService, {
    editView: SupplierEditor,
  })
</script>

<template>
  <APanel>
    <AToolBar
      :entity="SupplierEntity"
      :loading="isLoading"
      :service="SupplierService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SupplierEntity"
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
