<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="60%"
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
        <el-form-item :label="PurchaseEntity.getFieldName('billCode')">
          <AInput
            v-model.billCode="formData.billCode"
            :entity="PurchaseEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="PurchaseEntity.getFieldName('totalPrice')">
          <AInput
            v-model.totalPrice="formData.totalPrice"
            :entity="PurchaseEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="PurchaseEntity.getFieldName('createTime')">
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item :label="PurchaseEntity.getFieldName('updateTime')">
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          :label="PurchaseEntity.getFieldName('reason')"
        >
          <AInput
            v-model.reason="formData.reason"
            :entity="PurchaseEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="PurchaseEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="PurchaseEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === PurchaseStatus.REJECTED"
          style="width: 100%;"
          :label="PurchaseEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="PurchaseEntity"
            disabled
          />
        </el-form-item>
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
              :disabled="formData.status !== PurchaseStatus.PURCHASING"
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
  AButton,
  ADateTime,
  ADialog, AGroup, AInput, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatus } from '@/model/channel/purchase/PurchaseStatus'
import { useBillDetail } from '@/hook/billTable/useBillDetail'

const props = defineProps(airPropsParam(new PurchaseEntity()))

const {
  title, formData, isLoading, onAddFinish,
} = useBillDetail(props, PurchaseEntity, PurchaseService, {
})

</script>
