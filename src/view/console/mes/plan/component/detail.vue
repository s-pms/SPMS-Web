<script lang="ts" setup>
import { ADateTime, ADialog, AFormField, AGroup, ASelect, ATable, DialogProps, useDetail } from '@airpower/web'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'

import { PlanService } from '@/model/mes/plan/PlanService'
import { CustomerSelector } from '@/view/console/channel/customer/component'

const props = defineProps(DialogProps.withParam(new PlanEntity()))

const {
  title,
  formData,
  isLoading,
} = useDetail(props, PlanService, {})
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
        title="生产计划"
      >
        <BillFormCode :bill="formData" />
        <AFormField field="startTime">
          <ADateTime :time="formData.startTime" />
        </AFormField>

        <AFormField field="deliverTime">
          <ADateTime :time="formData.deliverTime" />
        </AFormField>

        <AFormField
          disabled
          field="type"
        />

        <el-form-item
          label="关联客户"
          prop="customer"
        >
          <ASelect
            v-model="formData.customer"
            :selector="CustomerSelector"
            disabled
          />
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="计划明细">
        <ATable
          :data-list="formData.details"
          :entity="PlanDetailEntity"
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
