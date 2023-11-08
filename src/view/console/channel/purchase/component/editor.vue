<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="60%"
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
        title="采购单"
        :column="2"
      >
        <el-form-item
          :label="PurchaseEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="PurchaseEntity"
          />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          :label="PurchaseEntity.getFieldName('reason')"
          prop="reason"
        >
          <AInput
            v-model.reason="formData.reason"
            :entity="PurchaseEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        :title="PurchaseEntity.getFieldName('purchaseDetail')"
        :column="1"
      >
        <ATable
          :entity="PurchaseDetailEntity"
          :data-list="formData.purchaseDetail"
          :field-list="PurchaseDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="row">
            {{ (row.data as PurchaseDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as PurchaseDetailEntity).material.name }}
          </template>
          <template #supplierCode="row">
            {{ (row.data as PurchaseDetailEntity).supplier.code }}
          </template>
          <template #supplierName="row">
            {{ (row.data as PurchaseDetailEntity).supplier.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ PurchaseEntity.getFieldName('purchaseDetail') }}
            </AButton>
          </template>
          <template #customRow="row">
            <AButton
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(row.index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AGroup, AInput, ATable, AButton,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, PurchaseEntity, PurchaseService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    return submitData
  },
})

async function addDetail() {
  const detail: PurchaseDetailEntity = await AirDialog.show(PurchaseDetailEditor)
  formData.value.purchaseDetail.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的采购明细？')
  formData.value.purchaseDetail.splice(index, 1)
}
</script>
