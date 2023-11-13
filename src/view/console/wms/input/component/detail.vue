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
          :label="InputEntity.getFieldName('billCode')"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="InputEntity.getFieldName('createTime')"
        >
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item
          :label="InputEntity.getFieldName('updateTime')"
        >
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          :label="InputEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="InputEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === InputStatus.REJECTED"
          style="width: 100%;"
          :label="InputEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :entity="InputDetailEntity"
          :data-list="formData.details"
          :field-list="InputDetailEntity.getTableFieldConfigList()"
          hide-ctrl
          :ctrl-width="60"
        >
          <template #materialCode="row">
            {{ (row.data as InputDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as InputDetailEntity).material.name }}
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
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { InputStatus } from '@/model/wms/input/InputStatus'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, InputEntity, InputService, {
})

</script>
