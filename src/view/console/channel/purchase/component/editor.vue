<script lang="ts" setup>
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'

import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getFieldLabel,
  getModelName,
  getTableConfigList,
  useEditor,
} from '@airpower/web'
import { PurchaseDetailEditor } from '.'

const props = defineProps(DialogProps.withParam(new PurchaseEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, PurchaseService, {
  afterGetDetail(detailData) {
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
  const detail: PurchaseDetailEntity = await DialogUtil.show(PurchaseDetailEditor)
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
    :title="title + getModelName(PurchaseEntity)"
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
        <AFormField
          field="reason"
          style="width: 100%"
        />
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :data-list="formData.details"
          :entity="PurchaseDetailEntity"
          :field-list="
            getTableConfigList(PurchaseDetailEntity).filter((item) => !['createTime'].includes(item.key))
          "
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #supplierCode="{ data }">
            {{ data.supplier.code }}
          </template>
          <template #supplierName="{ data }">
            {{ data.supplier.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(PurchaseEntity, 'details') }}
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
