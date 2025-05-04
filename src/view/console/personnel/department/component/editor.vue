<script lang="ts" setup>
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new DepartmentEntity()))

const {
  title,
  formData,
  formRef,
  isLoading,
  rules,
  onSubmit,
} = useEditor(props, DepartmentService, {})
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    hide-fullscreen
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父部门"
      >
        {{ param.parent.name }}
      </el-form-item>
      <AFormField field="name" />
      <AFormField field="orderNo" />
      <AFormField field="code" />
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped></style>
