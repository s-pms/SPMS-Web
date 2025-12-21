<script lang="ts" setup>
import { ADateTime, ADialog, AFormField, AGroup, DialogProps, useDetail } from '@airpower/web'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'

const props = defineProps(DialogProps.withParam(new OrderEntity()))

const {
  formData,
  isLoading,
} = useDetail(props, OrderService, {})
</script>

<template>
  <ADialog
    :loading="isLoading"
    height="80%"
    title="订单详情"
    width="80%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="生产订单"
      >
        <BillFormCode :bill="formData" />

        <AFormField field="startTime">
          <ADateTime :time="formData.startTime" />
        </AFormField>

        <AFormField field="deliverTime">
          <ADateTime :time="formData.deliverTime" />
        </AFormField>

        <AFormField field="materialName">
          {{ formData.material?.name }}
        </AFormField>
        <AFormField field="quantity">
          {{ formData.quantity }}
        </AFormField>
        <AFormField
          disabled
          field="type"
        />
        <AFormField field="materialCode">
          {{ formData.material?.code }}
        </AFormField>
        <AFormField field="finishQuantity">
          {{ formData.finishQuantity }}
        </AFormField>

        <el-form-item
          label="关联客户"
          prop="customerId"
        >
          <el-input
            :value="formData.customer?.name"
            clearable
            disabled
            placeholder="未选择客户"
          />
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="生产工艺">
        123
      </AGroup>
    </el-form>
  </ADialog>
</template>
