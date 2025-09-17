<script lang="ts" setup>
import type { OrderDetailEntity } from '@/model/mes/order/OrderDetailEntity'

import type { OrderEntity } from '@/model/mes/order/OrderEntity'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { OrderService } from '@/model/mes/order/OrderService'

import { OrderStatusEnum } from '@/model/mes/order/OrderStatusEnum'
import { AButton, APanel, ATable, DialogUtil, FeedbackUtil } from '@airpower/web'
import { CustomerDetail } from '../../channel/customer/component'
import { OrderDetail, OrderEditor, OrderFinishEditor } from './component'

const hook = useBillTable(OrderService, {
  editView: OrderEditor,
  detailView: OrderDetail,
})

async function onAddDetail(order: OrderEntity) {
  const detail = await DialogUtil.show<OrderDetailEntity>(OrderFinishEditor, order.quantity)
  detail.billId = order.id
  await OrderService.create(hook.isLoading).addOrderDetail(detail)
  hook.onGetList()
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
  await FeedbackUtil.confirmWarning(`是否确认${startOrPauseLabel(order)}订单？`, '操作提醒')
  const http = OrderService.create(hook.isLoading)
  switch (order.status) {
    case OrderStatusEnum.PRODUCING.key:
      await http.pause(order)
      break
    default:
      await http.start(order)
  }
  hook.onGetList()
}
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !OrderStatusEnum.REJECTED.equalsKey(row.status)"
      :use-hook="hook"
      ctrl-width="260"
      hide-delete
      show-detail
    >
      <template #customer="{ data }">
        <el-link
          v-if="data.customer"
          @click="DialogUtil.show(CustomerDetail, data.customer)"
        >
          {{ data.customer.name }}
        </el-link>
        <template v-else>
          -
        </template>
      </template>
      <template #customRow="{ data }">
        <template v-if="OrderStatusEnum.AUDITING.equalsKey(data.status)">
          <BillAuditOrReject
            :bill="data"
            @on-audit="hook.onAudit"
            @on-reject="hook.onReject"
          />
        </template>
        <template
          v-if="
            [OrderStatusEnum.PREPARE.key, OrderStatusEnum.PRODUCING.key, OrderStatusEnum.PAUSED.key].includes(
              data.status,
            )
          "
        >
          <AButton
            :disabled="!OrderStatusEnum.PRODUCING.equalsKey(data.status)"
            link
            @click="onAddDetail(data)"
          >
            报工
          </AButton>
          <AButton
            link
            @click="onStartOrPause(data)"
          >
            {{ startOrPauseLabel(data) }}
          </AButton>
          <AButton
            :disabled="!OrderStatusEnum.PRODUCING.equalsKey(data.status)"
            link
            @click="hook.setBillDetailsAllFinished(data)"
          >
            完成
          </AButton>
        </template>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
