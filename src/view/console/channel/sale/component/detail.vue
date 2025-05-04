<script lang="ts" setup>
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'

import { ADialog, AFormField, AGroup, ATable, DialogProps, getTableConfigList, useDetail } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new SaleEntity()))

const {
  title,
  formData,
  isLoading,
} = useDetail(props, SaleService, {})
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
        title="销售单"
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
      <AGroup title="销售明细">
        <ATable
          :data-list="formData.details"
          :entity="SaleDetailEntity"
          ctrl-width="60"
          hide-add
          hide-ctrl
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
