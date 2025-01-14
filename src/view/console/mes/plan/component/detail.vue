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
          :ctrl-width="60"
          :data-list="formData.details"
          :entity="PlanDetailEntity"
          :field-list="PlanDetailEntity.getTableFieldConfigList()"
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

<script lang="ts" setup>
import {
  ADateTime, ADialog, AFormField, AGroup, ASelect, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { CustomerSelector } from '@/view/console/channel/customer/component'

const props = defineProps(airPropsParam(new PlanEntity()))

const {
  title,
  formData,
  isLoading,
} = useAirDetail(props, PlanEntity, PlanService, {})

</script>
