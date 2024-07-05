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
        <AFormField field="billCode" />
        <AFormField field="startTime" />
        <AFormField field="deliverTime" />
        <AFormField field="type" />
        <el-form-item
          v-if="PlanTypeEnum.SALE.equalsKey(formData.type)"
          label="关联客户"
          prop="customerId"
        >
          <el-input
            v-model="formData.customerName"
            clearable
            placeholder="请选择计划关联客户"
            @clear="formData.exclude('customer', 'customerId')"
            @click="selectCustomer()"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="计划明细">
        <ATable
          :entity="PlanDetailEntity"
          :data-list="formData.details"
          :field-list="PlanDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ PlanEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { PlanDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { CustomerSelector } from '@/view/console/channel/customer/component'
import { PlanTypeEnum } from '@/model/mes/plan/PlanTypeEnum'

const props = defineProps(airPropsParam(new PlanEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, PlanEntity, PlanService, {
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
    if (submitData.details.length === 0) {
      AirNotification.warning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const detail: PlanDetailEntity = await AirDialog.show(PlanDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}

async function selectCustomer() {
  formData.value.customer = await AirDialog.select(CustomerSelector)
  formData.value.customerId = formData.value.customer.id
  formData.value.customerName = formData.value.customer.name
}
</script>
