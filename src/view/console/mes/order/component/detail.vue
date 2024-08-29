<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="生产订单"
        :column="3"
      >
        <BillFormCode :bill="formData" />

        <AFormField field="startTime">
          <ADateTime :time="formData.startTime" />
        </AFormField>

        <AFormField field="deliverTime">
          <ADateTime :time="formData.deliverTime" />
        </AFormField>

        <AFormField
          field="type"
          disabled
        />
        <el-form-item
          label="关联客户"
          prop="customerId"
        >
          <el-input
            :value="formData.customer?.name"
            clearable
            placeholder="未选择客户"
            disabled
          />
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADateTime, ADialog, AFormField, AGroup,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { BillFormCode, BillFormMoreDetail } from '@/component'

const props = defineProps(airPropsParam(new OrderEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, OrderEntity, OrderService, {})

</script>
