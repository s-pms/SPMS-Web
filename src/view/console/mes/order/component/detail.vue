<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="60%"
    height="80%"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="生产订单"
        :column="2"
      >
        <el-form-item
          :label="OrderEntity.getFieldName('billCode')"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('startTime')"
          prop="startTime"
        >
          <AInput
            v-model.startTime="formData.startTime"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('deliverTime')"
          prop="deliverTime"
        >
          <AInput
            v-model.deliverTime="formData.deliverTime"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('createTime')"
        >
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('updateTime')"
        >
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="关联客户"
          prop="customerId"
        >
          <el-input
            v-model="formData.customerName"
            clearable
            placeholder="请选择计划关联客户"
            disabled
          />
        </el-form-item>
        <el-form-item :label="OrderEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === OrderStatus.REJECTED"
          style="width: 100%;"
          :label="OrderEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="OrderEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADateTime,
  ADialog, AGroup, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { OrderStatus } from '@/model/mes/order/OrderStatus'

const props = defineProps(airPropsParam(new OrderEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, OrderEntity, OrderService, {
})

</script>
