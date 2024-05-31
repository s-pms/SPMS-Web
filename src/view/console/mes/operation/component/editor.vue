<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    confirm-text="保存"
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
      <AFormField field="name" />
      <AFormField field="code" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'

const props = defineProps(airPropsParam(new OperationEntity()))

const {
  formRef, isLoading, formData, rules, title,
  onSubmit,
} = useAirEditor(props, OperationEntity, OperationService)
</script>

<style scoped lang="scss"></style>
