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
        <el-form-item
          :label="PlanEntity.getFieldName('billCode')"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="PlanEntity.getFieldName('startTime')"
          prop="startTime"
        >
          <AInput
            v-model.startTime="formData.startTime"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="PlanEntity.getFieldName('deliverTime')"
          prop="deliverTime"
        >
          <AInput
            v-model.deliverTime="formData.deliverTime"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="PlanEntity.getFieldName('createTime')"
        >
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item
          :label="PlanEntity.getFieldName('updateTime')"
        >
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          :label="PlanEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
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
        <el-form-item :label="PlanEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === PlanStatus.REJECTED"
          style="width: 100%;"
          :label="PlanEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="PlanEntity"
            disabled
          />
        </el-form-item>
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
  ADateTime,
  ADialog, AGroup, AInput, ATable,
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
