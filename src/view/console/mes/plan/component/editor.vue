<script lang="ts" setup>
import {PlanDetailEntity} from '@/model/mes/plan/PlanDetailEntity'
import {PlanEntity} from '@/model/mes/plan/PlanEntity'
import {PlanService} from '@/model/mes/plan/PlanService'
import {PlanTypeEnum} from '@/model/mes/plan/PlanTypeEnum'

import {CustomerSelector} from '@/view/console/channel/customer/component'
import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ASelect,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getFieldLabel,
  getTableConfigList,
  useEditor,
} from '@airpower/web'
import {PlanDetailEditor} from '.'

const props = defineProps(DialogProps.withParam(new PlanEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, PlanService, {
  afterGetDetail(detailData) {
    detailData.customerName = detailData.customer.name
    detailData.customerId = detailData.customer.id
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.deliverTime < submitData.startTime) {
      FeedbackUtil.toastWarning('交付日期不能早于开始日期')
      return null
    }
    if (submitData.details.length === 0) {
      FeedbackUtil.toastWarning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const detail: PlanDetailEntity = await DialogUtil.show(PlanDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}
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
        title="生产计划"
      >
        <AFormField field="billCode" />
        <AFormField field="startTime" />
        <AFormField field="deliverTime" />
        <AFormField field="type" />
        <el-form-item
          v-if="PlanTypeEnum.SALE.equalsKey(formData.type)"
          label="关联客户"
          prop="customer"
        >
          <ASelect
            v-model="formData.customer"
            :selector="CustomerSelector"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="计划明细">
        <ATable
          :data-list="formData.details"
          :entity="PlanDetailEntity"
          :column-list="getTableConfigList(PlanDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #addButton>
            <AButton
              icon="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(PlanEntity, 'details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              link
              @click="deleteDetail(index)"
            >
              删除
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
