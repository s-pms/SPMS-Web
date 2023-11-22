<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
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
        <el-form-item
          :label="OrderEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="OrderEntity"
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="OrderEntity"
            @on-change="orderTypeChanged"
          />
        </el-form-item>
        <template v-if="formData.type === OrderType.PLAN">
          <el-form-item
            label="关联计划"
            prop="planId"
          >
            <el-input
              v-model="formData.planBillCode"
              clearable
              placeholder="请选择订单关联计划"
              @clear="formData.exclude('plan', 'planId')"
              @click="selectPlan()"
            />
          </el-form-item>
          <el-form-item />
        </template>
        <el-form-item
          label="物料信息"
          prop="materialId"
        >
          <el-input
            v-model="formData.materialName"
            clearable
            placeholder="请选择物料"
            :disabled="!formData.planId && formData.type === OrderType.PLAN"
            @clear="formData.exclude('material', 'materialId')"
            @click="selectMaterial()"
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('quantity')"
          prop="quantity"
        >
          <AInput
            v-model.quantity="formData.quantity"
            :entity="OrderEntity"
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('startTime')"
          prop="startTime"
        >
          <AInput
            v-model.startTime="formData.startTime"
            :entity="OrderEntity"
          />
        </el-form-item>
        <el-form-item
          :label="OrderEntity.getFieldName('deliverTime')"
          prop="deliverTime"
        >
          <AInput
            v-model.deliverTime="formData.deliverTime"
            :entity="OrderEntity"
          />
        </el-form-item>
        <el-form-item
          label="客户信息"
          prop="customerId"
        >
          <el-input
            v-model="formData.customerName"
            clearable
            placeholder="请选择客户"
            :disabled="formData.type === OrderType.PLAN && (formData.plan && formData.plan.customer)"
            @clear="formData.exclude('customer', 'customerId')"
            @click="selectCustomer()"
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AGroup, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { CustomerSelector } from '@/view/console/channel/customer/component'
import { OrderType } from '@/model/mes/order/OrderType'
import { PlanDetailSelector, PlanSelector } from '../../plan/component'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'

const props = defineProps(airPropsParam(new OrderEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, OrderEntity, OrderService, {
  afterGetDetail(detailData) {
    detailData.customerName = detailData.customer.name
    detailData.customerId = detailData.customer.id
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.deliverTime < submitData.startTime) {
      AirNotification.warning('交付日期不能早于开始日期')
      return null
    }
    return submitData
  },
})

async function selectCustomer() {
  formData.value.customer = await AirDialog.select(CustomerSelector)
  formData.value.customerId = formData.value.customer.id
  formData.value.customerName = formData.value.customer.name
}

async function selectPlan() {
  formData.value.plan = await AirDialog.select(PlanSelector)
  formData.value.planBillCode = formData.value.plan.billCode
  formData.value.planId = formData.value.plan.id
  formData.value.customer = formData.value.plan.customer
  formData.value.customerId = formData.value.customer.id
  formData.value.customerName = formData.value.customer.name
  formData.value.startTime = formData.value.plan.startTime
  formData.value.deliverTime = formData.value.plan.deliverTime
}

async function selectMaterial() {
  if (formData.value.type === OrderType.OTHER) {
    formData.value.material = await AirDialog.select(MaterialSelector)
    formData.value.materialId = formData.value.material.id
    formData.value.materialName = formData.value.material.name
    return
  }
  const planDetail: PlanDetailEntity = await AirDialog.show(PlanDetailSelector, formData.value.plan)
  formData.value.material = planDetail.material
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
  formData.value.quantity = planDetail.quantity
}

async function orderTypeChanged() {
  formData.value.expose('materialId', 'material')
}
</script>
