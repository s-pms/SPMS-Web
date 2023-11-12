<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="60%"
    height="60%"
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
        <el-form-item
          :label="SaleEntity.getFieldName('billCode')"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="SaleEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="SaleEntity.getFieldName('totalPrice')"
        >
          <AInput
            v-model.totalPrice="formData.totalPrice"
            :entity="SaleEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="SaleEntity.getFieldName('createTime')"
        >
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item
          :label="SaleEntity.getFieldName('updateTime')"
        >
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          style="width: 100%;"
          :label="SaleEntity.getFieldName('reason')"
        >
          <AInput
            v-model.reason="formData.reason"
            :entity="SaleEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="SaleEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="SaleEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === SaleStatus.REJECTED"
          style="width: 100%;"
          :label="SaleEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="SaleEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :entity="SaleDetailEntity"
          :data-list="formData.details"
          :field-list="SaleDetailEntity.getTableFieldConfigList()"
          hide-ctrl
          :ctrl-width="60"
        >
          <template #materialCode="row">
            {{ (row.data as SaleDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as SaleDetailEntity).material.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADateTime,
  ADialog, AGroup, AInput, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { SaleStatus } from '@/model/channel/sale/SaleStatus'

const props = defineProps(airPropsParam(new SaleEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, SaleEntity, SaleService, {
})

</script>
