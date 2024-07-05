<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="采购单"
        :column="3"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          field="totalPrice"
          disabled
        />
        <AFormField
          style="width: 100%;"
          field="reason"
          disabled
        />
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="采购明细">
        <ATable
          :entity="PurchaseDetailEntity"
          :data-list="formData.details"
          :field-list="PurchaseDetailEntity.getTableFieldConfigList()"
          hide-ctrl
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
          <template #endRow="{ data }">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled="!PurchaseStatusEnum.PURCHASING.equalsKey(formData.status)"
              type="CHECKIN"
              @click="onAddFinish(data)"
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
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { BillFormCode, BillFormMoreDetail } from '@/component'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const {
  title, formData, isLoading, onAddFinish,
} = useBillDetail(props, PurchaseEntity, PurchaseService, {})

</script>
