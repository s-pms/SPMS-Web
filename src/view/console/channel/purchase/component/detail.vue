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
        :column="2"
      >
        <AFormField
          field="billCode"
          disabled
        />
        <AFormField
          field="totalPrice"
          disabled
        />
        <AFormField
          field="createTime"
          disabled
        >
          <ADateTime :time="formData.createTime" />
        </AFormField>
        <AFormField
          field="updateTime"
          disabled
        >
          <ADateTime :time="formData.updateTime" />
        </AFormField>
        <AFormField
          style="width: 100%;"
          field="reason"
          disabled
        />
        <AFormField
          field="status"
          disabled
        />
        <AFormField
          v-if="PurchaseStatusEnum.REJECTED.equalsKey(formData.status)"
          style="width: 100%"
          field="rejectReason"
          disabled
        />
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :entity="PurchaseDetailEntity"
          :data-list="formData.details"
          :field-list="PurchaseDetailEntity.getTableFieldConfigList()"
          hide-ctrl
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
          <template #endRow="row">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled="!PurchaseStatusEnum.PURCHASING.equalsKey(formData.status)"
              type="CHECKIN"
              @click="onAddFinish(row.data)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADateTime, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const {
  title, formData, isLoading, onAddFinish,
} = useBillDetail(props, PurchaseEntity, PurchaseService, {})

</script>
