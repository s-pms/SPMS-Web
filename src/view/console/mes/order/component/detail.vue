<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="80%"
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
        <AFormField
          field="billCode"
          disabled
        />

        <AFormField field="startTime">
          <ADateTime :time="formData.startTime" />
        </AFormField>

        <AFormField field="deliverTime">
          <ADateTime :time="formData.deliverTime" />
        </AFormField>

        <AFormField field="createTime">
          <ADateTime :time="formData.createTime" />
        </AFormField>

        <AFormField field="updateTime">
          <ADateTime :time="formData.updateTime" />
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

        <AFormField
          field="status"
          disabled
        />
        <AFormField
          v-if="OrderStatusEnum.REJECTED.equalsKey(formData.status)"
          style="width: 100%"
          field="rejectReason"
          disabled
        />
      </AGroup>
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
import { OrderStatusEnum } from '@/model/mes/order/OrderStatusEnum'

const props = defineProps(airPropsParam(new OrderEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, OrderEntity, OrderService, {})

</script>
