<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField field="name" />
      <AFormField field="code" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'

const props = defineProps(airPropsParam(new OperationEntity()))

const {
  formRef,
  isLoading,
  formData,
  rules,
  title,
  onSubmit,
} = useAirEditor(props, OperationEntity, OperationService)
</script>

<style lang="scss" scoped></style>
