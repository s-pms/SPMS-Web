<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      {{ formData }}
      <AGroup
        :column="2"
        title="生产计划"
      >
        <AFormField field="billCode" />
        <AFormField
          field="type"
          @on-change="orderTypeChanged"
        />
        <template v-if="OrderTypeEnum.PLAN.equalsKey(formData.type)">
          <el-form-item
            label="关联计划"
            prop="plan"
          >
            <ASelect
              v-model="formData.plan"
              :selector="PlanSelector"
              placeholder="请选择订单关联计划"
              @change="selectPlan()"
            />
          </el-form-item>
          <el-form-item />
        </template>
        <el-form-item
          label="物料信息"
          prop="material"
        >
          <el-input
            :value="formData.material?.name || ''"
            placeholder="请选择物料"
            readonly
          >
            <template #append>
              <el-button
                @click="formData.material ? formData.exclude('material') : selectMaterial() "
              >
                {{ formData.material ? '清除' : '选择' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <AFormField field="quantity" />
        <AFormField field="startTime" />
        <AFormField field="deliverTime" />
        <el-form-item
          label="客户信息"
          prop="customer"
        >
          <ASelect
            v-model="formData.customer"
            :disabled="isCustomerDisabled"
            :selector="CustomerSelector"
            placeholder="请选择客户..."
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  ADialog, AFormField, AGroup, ASelect,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { CustomerSelector } from '@/view/console/channel/customer/component'
import { PlanDetailSelector, PlanSelector } from '../../plan/component'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { OrderTypeEnum } from '@/model/mes/order/OrderTypeEnum'
import { PlanTypeEnum } from '@/model/mes/plan/PlanTypeEnum'

const props = defineProps(airPropsParam(new OrderEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, OrderEntity, OrderService, {
  beforeSubmit(submitData) {
    if (submitData.deliverTime < submitData.startTime) {
      AirNotification.warning('交付日期不能早于开始日期')
      return null
    }
    return submitData
  },
})

async function selectPlan() {
  if (formData.value.plan) {
    formData.value.customer = formData.value.plan.customer
    formData.value.startTime = formData.value.plan.startTime
    formData.value.deliverTime = formData.value.plan.deliverTime
  } else {
    formData.value.exclude('customer', 'material')
  }
}

async function selectMaterial() {
  if (OrderTypeEnum.OTHER.equalsKey(formData.value.type)) {
    formData.value.material = await AirDialog.select(MaterialSelector)
    return
  }
  const planDetail: PlanDetailEntity = await AirDialog.show(PlanDetailSelector, formData.value.plan)
  formData.value.material = planDetail.material
  formData.value.quantity = planDetail.quantity
  if (formData.value.plan && PlanTypeEnum.SALE.equalsKey(formData.value.plan.type)) {
    // 如果是外销计划
    formData.value.customer = formData.value.plan.customer
  }
}

async function orderTypeChanged() {
  if (OrderTypeEnum.PLAN.equalsKey(formData.value.type)) {
    formData.value.exclude('materialId', 'material')
  }
}

const isCustomerDisabled = computed(() => {
  if (formData.value.type === OrderTypeEnum.PLAN.key) {
    if (formData.value.plan && PlanTypeEnum.SALE.equalsKey(formData.value.plan.type)) {
      // 如果是外销计划 则禁用选择客户 自动从外销计划带出
      return true
    }
  }
  return false
})
</script>
