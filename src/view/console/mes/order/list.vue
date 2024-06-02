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
      :disable-edit="(row: OrderEntity) => OrderStatusEnum.REJECTED.notEqualsKey(row.status)"
      hide-delete
      show-detail
      :ctrl-width="160"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customer="row">
        <el-link
          v-if="(row.data as OrderEntity).customer"
          @click="AirDialog.show(CustomerDetail,(row.data as OrderEntity).customer)"
        >
          {{ (row.data as OrderEntity).customer.name }}
        </el-link>
        <template v-else>
          -
        </template>
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
        <BillAuditOrReject
          :bill="row.data"
          @on-audit="onAudit"
          @on-reject="onReject"
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
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { OrderDetail, OrderEditor } from './component'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { CustomerDetail } from '../../channel/customer/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { OrderStatusEnum } from '@/model/mes/order/OrderStatusEnum'
import { BillAuditOrReject } from '@/component'

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
