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

        <AFormField field="startTime">
          <ADateTime :time="formData.startTime" />
        </AFormField>

        <AFormField field="deliverTime">
          <ADateTime :time="formData.deliverTime" />
        </AFormField>

        <AFormField field="createTime">
          <ADateTime :time="formData.createTime" />
        </AFormField>

        <AFormField field="updateTime">
          <ADateTime :time="formData.updateTime" />
        </AFormField>

        <AFormField
          field="type"
          disabled
        />

        <el-form-item
          label="关联客户"
          prop="customerId"
        >
          <el-input
            v-model="formData.customerName"
            clearable
            placeholder="请选择计划关联客户"
            disabled
          />
        </el-form-item>

        <AFormField
          field="status"
          disabled
        />
        <AFormField
          v-if="formData.status === PlanStatus.REJECTED"
          style="width: 100%"
          field="rejectReason"
          disabled
        />
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :entity="PlanDetailEntity"
          :data-list="formData.details"
          :field-list="PlanDetailEntity.getTableFieldConfigList()"
          hide-ctrl
          :ctrl-width="60"
        >
          <template #materialCode="row">
            {{ (row.data as PlanDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as PlanDetailEntity).material.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADateTime, ADialog, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { PlanStatus } from '@/model/mes/plan/PlanStatus'

const props = defineProps(airPropsParam(new PlanEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, PlanEntity, PlanService, {
})

</script>
