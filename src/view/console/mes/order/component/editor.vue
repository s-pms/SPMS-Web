<script lang="ts" setup>
import type { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { ADialog, AFormField, AGroup, ASelect, DialogProps, DialogUtil, FeedbackUtil, useEditor } from '@airpower/web'
import { computed, ref } from 'vue'
import { OrderEntity } from '@/model/mes/order/OrderEntity'
import { OrderService } from '@/model/mes/order/OrderService'
import { OrderTypeEnum } from '@/model/mes/order/OrderTypeEnum'

import { PlanTypeEnum } from '@/model/mes/plan/PlanTypeEnum'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { CustomerSelector } from '@/view/console/channel/customer/component'
import { PlanDetailSelector, PlanSelector } from '../../plan/component'
import { RoutingSelector } from '../../routing/component'

const props = defineProps(DialogProps.withParam(new OrderEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, OrderService, {
  beforeSubmit(submitData) {
    if (submitData.deliverTime < submitData.startTime) {
      FeedbackUtil.toastWarning('交付日期不能早于开始日期')
      return null
    }
    return submitData
  },
})

const routingFilter = ref(new RoutingEntity())
routingFilter.value.isPublished = true
routingFilter.value.material = formData.value.material.copyOnlyId()

async function selectPlan() {
  if (formData.value.plan) {
    formData.value.customer = formData.value.plan.customer
    formData.value.startTime = formData.value.plan.startTime
    formData.value.deliverTime = formData.value.plan.deliverTime
  }
  else {
    formData.value.exclude('customer', 'material')
  }
}

async function selectMaterial() {
  if (OrderTypeEnum.OTHER.equalsKey(formData.value.type)) {
    formData.value.material = await DialogUtil.select(MaterialSelector)
    routingFilter.value.material = formData.value.material
    return
  }
  const planDetail: PlanDetailEntity = await DialogUtil.show(PlanDetailSelector, formData.value.plan)
  formData.value.material = planDetail.material
  routingFilter.value.material = formData.value.material
  formData.value.quantity = planDetail.quantity
  if (formData.value.plan && PlanTypeEnum.SALE.equalsKey(formData.value.plan.type)) {
    // 如果是外销计划
    formData.value.customer = formData.value.plan.customer
  }
}

async function clearMaterial() {
  formData.value.exclude('material')
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

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="生产订单"
      >
        <AFormField field="billCode" />
        <AFormField
          field="type"
          @change="orderTypeChanged"
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
              <el-button @click="formData.material ? clearMaterial() : selectMaterial()">
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
      <AGroup
        :column="2"
        title="生产工艺"
      >
        <el-form-item
          label="生产工艺"
          prop="routing"
        >
          <ASelect
            v-model="formData.routing"
            :disabled="!formData.material"
            :param="routingFilter"
            :selector="RoutingSelector"
            placeholder="请选择生产工艺..."
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>
