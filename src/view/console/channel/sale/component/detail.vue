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
  ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { BillFormCode, BillFormMoreDetail } from '@/component'

const props = defineProps(airPropsParam(new SaleEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, SaleEntity, SaleService, {})

</script>
