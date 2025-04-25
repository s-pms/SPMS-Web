<script lang="ts" setup>
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'

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
import { SaleDetailEditor } from '.'
import { CustomerSelector } from '../../customer/component'

const props = defineProps(DialogProps.withParam(new SaleEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, SaleService, {
  afterGetDetail(detailData) {
    detailData.customerName = detailData.customer.name
    detailData.customerId = detailData.customer.id
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      FeedbackUtil.toastWarning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const newDetail = new SaleDetailEntity()
  newDetail.customer = formData.value.customer
  const detail: SaleDetailEntity = await DialogUtil.show(SaleDetailEditor, newDetail)

  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的采购明细？')
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
        title="采购单"
      >
        <AFormField field="billCode" />
        <el-form-item
          label="销售客户"
          prop="customer"
        >
          <ASelect
            v-model="formData.customer"
            :selector="CustomerSelector"
          />
        </el-form-item>
        <AFormField
          field="reason"
          style="width: 100%"
        />
      </AGroup>
      <AGroup title="销售明细">
        <ATable
          :data-list="formData.details"
          :entity="SaleDetailEntity"
          :field-list="getTableConfigList(SaleDetailEntity).filter((item) => !['createTime'].includes(item.key))"
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
              type="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(SaleEntity, 'details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              icon-button
              type="DELETE"
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
