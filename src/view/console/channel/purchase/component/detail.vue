<script lang="ts" setup>
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'

import { AButton, ADialog, AFormField, AGroup, ATable, DialogProps, getTableConfigList } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new PurchaseEntity()))

const {
  title,
  formData,
  isLoading,
  addDetailFinishQuantity,
} = useBillDetail(props, PurchaseService)
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="采购单"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          disabled
          field="totalPrice"
        />
        <AFormField
          disabled
          field="reason"
          style="width: 100%"
        />
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="采购明细">
        <ATable
          :data-list="formData.details"
          :entity="PurchaseDetailEntity"
          :field-list="getTableConfigList(PurchaseDetailEntity)"
          hide-ctrl
        >
          <template #materialCode="{ data }">
            {{ data.material?.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material?.name }}
          </template>
          <template #supplierCode="{ data }">
            {{ data.supplier?.code }}
          </template>
          <template #supplierName="{ data }">
            {{ data.supplier?.name }}
          </template>
          <template #endRow="{ data }">
            <AButton
              :disabled="!PurchaseStatusEnum.PURCHASING.equalsKey(formData.status)"
              icon-button
              tooltip="添加完成"
              type="CHECKIN"
              @click="addDetailFinishQuantity(data, param.id)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
