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

<script lang="ts" setup>
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

const props = defineProps(airPropsParam(new DepartmentEntity()))

const {
  title,
  formData,
  formRef,
  isLoading,
  rules,
  onSubmit,
} = useAirEditor(props, DepartmentEntity, DepartmentService, {})
</script>

<style lang="scss" scoped></style>
