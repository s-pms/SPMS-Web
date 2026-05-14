<script lang="ts" setup>
import { ADialog, AInput, DialogProps, getFieldLabel } from '@airpower/web'
import { ref } from 'vue'
import { OrderDetailEntity } from '@/model/mes/order/OrderDetailEntity'
import { OrderDetailService } from '@/model/mes/order/OrderDetailService'

const props = defineProps(
  Object.assign(DialogProps.create(), {
    /**
     * ### 添加完成数量
     */
    param: {
      type: Number,
      default: 0,
    },
  }),
)

const orderDetail = ref(new OrderDetailEntity())
orderDetail.value.quantity = props.param
orderDetail.value.ngQuantity = 0

const rules = OrderDetailService.createValidator()
</script>

<template>
  <ADialog
    :disable-confirm="orderDetail.quantity <= 0 && orderDetail.ngQuantity <= 0"
    confirm-text="添加完成"
    hide-fullscreen
    min-height="200px"
    title="订单报工"
    @cancel="onCancel"
    @confirm="onConfirm(orderDetail)"
  >
    <el-form
      :model="orderDetail"
      :rules="rules"
      label-width="80"
      @submit.prevent
    >
      <el-form-item
        :label="getFieldLabel(OrderDetailEntity, 'quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="orderDetail.quantity"
          :entity="OrderDetailEntity"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(OrderDetailEntity, 'ngQuantity')"
        prop="ngQuantity"
      >
        <AInput
          v-model.ngQuantity="orderDetail.ngQuantity"
          :entity="OrderDetailEntity"
          clearable
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>
