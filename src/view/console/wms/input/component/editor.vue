<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="60%"
    height="70%"
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
        title="入库单"
        :column="2"
      >
        <el-form-item
          :label="InputEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="InputEntity"
          />
        </el-form-item>
        <el-form-item
          :label="InputEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="InputEntity"
            @on-change="inputTypeChanged"
          />
        </el-form-item>
        <el-form-item
          label="目标存储资源"
          prop="storageId"
        >
          <el-input
            v-model="formData.storageName"
            clearable
            placeholder="请选择入库存储资源"
            @clear="formData.exclude('storage', 'storageId')"
            @click="selectStorage()"
          />
        </el-form-item>
        <el-form-item
          v-if="formData.type === InputType.PURCHASE"
          label="采购单"
          prop="purchaseId"
        >
          <el-input
            v-model="formData.purchaseBillCode"
            clearable
            placeholder="请选择采购单"
            @clear="formData.exclude('purchase', 'purchaseId')"
            @click="selectPurchase()"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="入库明细">
        <ATable
          :entity="InputDetailEntity"
          :data-list="formData.details"
          :field-list="InputDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="row">
            {{ (row.data as InputDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as InputDetailEntity).material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              :disabled="isAddDetailDisabled"
              @click="addDetail()"
            >
              添加{{ InputEntity.getFieldName('details') }}
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
import { computed } from 'vue'
import {
  ADialog, AGroup, AInput, ATable, AButton,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { StorageSelector } from '@/view/console/factory/storage/component'
import { InputType } from '@/model/wms/input/InputType'
import { PurchaseDetailSelector, PurchaseSelector } from '@/view/console/channel/purchase/component'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, InputEntity, InputService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
    detailData.storageId = detailData.storage.id
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

const isAddDetailDisabled = computed(() => {
  if (formData.value.type === InputType.PURCHASE && !formData.value.purchaseId) {
    return true
  }
  return false
})

async function addDetail() {
  let detail = new InputDetailEntity()
  const inputDetail = new InputDetailEntity()
  switch (formData.value.type) {
    case InputType.OTHER:
      detail = await AirDialog.show(InputDetailEditor)
      formData.value.details.push(detail)
      break
    case InputType.PURCHASE:
      // eslint-disable-next-line no-case-declarations
      const purchaseDetail: PurchaseDetailEntity = await AirDialog.show(PurchaseDetailSelector, new PurchaseEntity(formData.value.purchaseId))
      inputDetail.material = purchaseDetail.material
      detail = await AirDialog.show(InputDetailEditor, inputDetail)
      formData.value.details.push(detail)
      break
    default:
      AirNotification.warning('暂不支持')
  }
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}

async function selectStorage() {
  formData.value.storage = await AirDialog.select(StorageSelector)
  formData.value.storageId = formData.value.storage.id
  formData.value.storageName = formData.value.storage.name
}

async function selectPurchase() {
  formData.value.purchase = await AirDialog.select(PurchaseSelector)
  formData.value.purchaseId = formData.value.purchase.id
  formData.value.purchaseBillCode = formData.value.purchase.billCode
}

function inputTypeChanged() {
  formData.value.exclude('purchase', 'purchaseId', 'purchaseBillCode')
  formData.value.details = []
}
</script>
