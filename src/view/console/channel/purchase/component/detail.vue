<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
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
          style="width: 100%;"
        />
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="采购明细">
        <ATable
          :data-list="formData.details"
          :entity="PurchaseDetailEntity"
          :field-list="PurchaseDetailEntity.getTableFieldConfigList()"
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
              @click="addDetailFinishQuantity(data)"
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
} from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { BillFormCode, BillFormMoreDetail } from '@/component'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const {
  title, formData, isLoading, addDetailFinishQuantity,
} = useBillDetail(props, PurchaseEntity, PurchaseService)

</script>
