<script lang="ts" setup>
import { AButton, ADialog, AFormField, AGroup, ATable, DialogProps } from '@airpower/web'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'

import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'

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
    @cancel="onCancel"
    @confirm="onConfirm"
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
          hide-add
          hide-delete
          hide-edit
        >
          <template #endRow="{ data }">
            <AButton
              :disabled="!PurchaseStatusEnum.PURCHASING.equalsKey(formData.status)"
              link
              @click="addDetailFinishQuantity(data, param.id)"
            >
              作业
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
