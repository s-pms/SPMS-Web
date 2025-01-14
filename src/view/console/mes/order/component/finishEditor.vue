<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="orderDetail.finishQuantity <= 0 && orderDetail.ngQuantity <=0"
    confirm-text="添加完成"
    min-height="200px"
    title="添加完成数量"
    @on-confirm="onConfirm(orderDetail)"
    @on-cancel="onCancel"
  >
    <el-form
      :model="orderDetail"
      :rules="rules"
      label-width="80"
      @submit.prevent
    >
      <el-form-item
        :label="OrderDetailEntity.getFieldName('finishQuantity')"
        prop="finishQuantity"
      >
        <AInput
          v-model.finishQuantity="orderDetail.finishQuantity"
          :entity="OrderDetailEntity"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="OrderDetailEntity.getFieldName('ngQuantity')"
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

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'
import { OrderDetailEntity } from '@/model/mes/order/OrderDetailEntity'
import { OrderDetailService } from '@/model/mes/order/OrderDetailService'

const props = defineProps(Object.assign(airProps(), {
  /**
   * ### 添加完成数量
   */
  param: {
    type: Number,
    default: 0,
  },
}))

const orderDetail = ref(new OrderDetailEntity())
orderDetail.value.finishQuantity = props.param
orderDetail.value.ngQuantity = 0

const rules = OrderDetailService.createValidator(orderDetail.value)

</script>
