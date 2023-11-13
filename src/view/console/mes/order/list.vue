<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="OrderEntity"
      :service="OrderService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OrderEntity"
      :select-list="selectList"
      :disable-edit="(row: OrderEntity) => row.status !== OrderStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customerCode="row">
        {{ (row.data as OrderEntity).customer?.code || "-" }}
      </template>
      <template #customerName="row">
        {{ (row.data as OrderEntity).customer?.name || "-" }}
      </template>
      <template #materialCode="row">
        {{ (row.data as OrderEntity).material.code }}
      </template>
      <template #materialName="row">
        {{ (row.data as OrderEntity).material.name }}
      </template>
      <template #planBillCode="row">
        {{ (row.data as OrderEntity).plan?.billCode || '-' }}
      </template>
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as OrderEntity).status !== OrderStatus.AUDITING"
          @click="onAudit(row.data)"
        />
        <AButton
          icon-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as OrderEntity).status !== OrderStatus.AUDITING"
          @click="onReject(row.data)"
        />
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
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { OrderDetail, OrderEditor } from './component'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { OrderStatus } from '@/model/mes/order/OrderStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(OrderEntity, OrderService, {
  editView: OrderEditor,
  detailView: OrderDetail,
})
</script>
<style scoped lang="scss"></style>
