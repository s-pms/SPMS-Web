<script lang="ts" setup>
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { AButton, ADialog, AFormField, AGroup, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { PurchaseDetailEditor } from '.'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const { title, formData, rules, formRef, isLoading, onSubmit } = useAirEditor(props, PurchaseEntity, PurchaseService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      AirNotification.warning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const detail: PurchaseDetailEntity = await AirDialog.show(PurchaseDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的采购明细？')
  formData.value.details.splice(index, 1)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title + PurchaseEntity.getModelName()"
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
            PurchaseDetailEntity.getTableFieldConfigList().filter((item) => !['createTime'].includes(item.key))
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
              添加{{ PurchaseEntity.getFieldName('details') }}
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
