<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="生产计划"
        :column="2"
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
            clearable
            placeholder="请选择物料"
            :value="formData.material?.name || ''"
            @clear="formData.exclude('material')"
            @click="selectMaterial()"
          />
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
            :selector="CustomerSelector"
            placeholder="请选择客户..."
            :disabled="OrderTypeEnum.PLAN.equalsKey(formData.type) && !!formData.plan && !!formData.plan.customer"
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
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
    formData.value.materialName = formData.value.material.name
    return
  }
  const planDetail: PlanDetailEntity = await AirDialog.show(PlanDetailSelector, formData.value.plan)
  formData.value.material = planDetail.material
  formData.value.materialName = formData.value.material.name
  formData.value.quantity = planDetail.quantity
}

async function orderTypeChanged() {
  if (OrderTypeEnum.PLAN.equalsKey(formData.value.type)) {
    formData.value.exclude('materialId', 'material')
  }
}
</script>
