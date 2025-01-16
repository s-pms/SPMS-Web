<template>
  <APanel>
    <AToolBar
      :entity="OrderEntity"
      :loading="isLoading"
      :service="OrderService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="260"
      :data-list="response.list"
      :disable-edit="row => OrderStatusEnum.REJECTED.notEqualsKey(row.status)"
      :entity="OrderEntity"
      :select-list="selectList"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #customer="{ data }">
        <el-link
          v-if="data.customer"
          @click="AirDialog.show(CustomerDetail, data.customer)"
        >
          {{ data.customer.name }}
        </el-link>
        <template v-else>
          -
        </template>
      </template>
      <template #materialCode="{ data }">
        {{ data.material.code }}
      </template>
      <template #materialName="{ data }">
        {{ data.material.name }}
      </template>
      <template #planBillCode="{ data }">
        {{ data.plan?.billCode || '-' }}
      </template>
      <template #moreButton>
        123
      </template>
      <template #customRow="{ data }">
        <template v-if="OrderStatusEnum.AUDITING.equalsKey(data.status)">
          <BillAuditOrReject
            :bill="data"
            @on-audit="onAudit"
            @on-reject="onReject"
          />
        </template>
        <template
          v-if="[
            OrderStatusEnum.PREPARE.key,
            OrderStatusEnum.PRODUCING.key,
            OrderStatusEnum.PAUSED.key,
          ].includes(data.status)"
        >
          <AButton
            :disabled="OrderStatusEnum.PRODUCING.notEqualsKey(data.status)"
            link-button
            @click="onAddDetail(data)"
          >
            报工
          </AButton>
          <AButton
            link-button
            @click="onStartOrPause(data)"
          >
            {{ startOrPauseLabel(data) }}
          </AButton>
          <AButton
            :disabled="OrderStatusEnum.PRODUCING.notEqualsKey(data.status)"
            link-button
            @click="onFinish(data)"
          >
            完成
          </AButton>
        </template>
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
  AButton, APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { OrderDetail, OrderEditor, OrderFinishEditor } from './component'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { CustomerDetail } from '../../channel/customer/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { OrderStatusEnum } from '@/model/mes/order/OrderStatusEnum'
import { BillAuditOrReject } from '@/component'
import { OrderDetailEntity } from '@/model/mes/order/OrderDetailEntity'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

const {
  isLoading,
  response,
  selectList,
  onSearch,
  onAdd,
  onEdit,
  onPageChanged,
  onSortChanged,
  onSelected,
  onDetail,
  onAudit,
  onReject,
  onFinish,
  onGetList,
} = useBillTable(OrderEntity, OrderService, {
  editView: OrderEditor,
  detailView: OrderDetail,
})

async function onAddDetail(order: OrderEntity) {
  const detail = await AirDialog.show<OrderDetailEntity>(OrderFinishEditor, order.quantity)
  detail.billId = order.id
  await OrderService.create(isLoading)
    .addFinish(detail)
  onGetList()
}

function startOrPauseLabel(order: OrderEntity) {
  switch (order.status) {
    case OrderStatusEnum.PRODUCING.key:
      return '暂停'
    default:
      return '开始'
  }
}

async function onStartOrPause(order: OrderEntity) {
  await AirConfirm.warning(`是否确认${startOrPauseLabel(order)}订单？`, '操作提醒')
  const http = OrderService.create(isLoading)
  switch (order.status) {
    case OrderStatusEnum.PRODUCING.key:
      await http.pause(order)
      break
    default:
      await http.start(order)
  }
  onGetList()
}

</script>
<style lang="scss" scoped></style>
