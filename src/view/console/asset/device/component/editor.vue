<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        :label="DeviceEntity.getFieldName('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="DeviceEntity"
        />
      </el-form-item>
      <el-form-item
        :label="DeviceEntity.getFieldName('code')"
        prop="code"
      >
        <AInput
          v-model.code="formData.code"
          :entity="DeviceEntity"
        />
      </el-form-item>
      <el-form-item
        :label="DeviceEntity.getFieldName('uuid')"
        prop="uuid"
      >
        <AInput
          v-model.uuid="formData.uuid"
          :entity="DeviceEntity"
        />
      </el-form-item>
      <el-form-item
        :label="DeviceEntity.getFieldName('isReporting')"
        prop="isReporting"
      >
        <AInput
          v-model.isReporting="formData.isReporting"
          :entity="DeviceEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'

const props = defineProps(airPropsParam(new DeviceEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, DeviceEntity, DeviceService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('unitId')
    return submitData
  },
})

</script>
