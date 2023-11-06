<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SupplierEntity"
      :service="SupplierService"
      @on-add="onAdd"
      @on-search="onSearch"
    >
      <template #afterButton>
        <AButton
          v-if="selectList.length > 0"
          type="DELETE_LIST"
          danger
          @click="AirNotification.warning('就是玩'); selectList = []"
        >
          批量删除
        </AButton>
      </template>
    </AToolBar>
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SupplierEntity"
      :select-list="selectList"
      show-select
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
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

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { SupplierEditor } from './component'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(SupplierEntity, SupplierService, {
  editView: SupplierEditor,
  beforeSearch(requestData) {
    requestData.keyword = '强制搜索关键词'
    return requestData
  },
})
</script>
<style scoped lang="scss"></style>
