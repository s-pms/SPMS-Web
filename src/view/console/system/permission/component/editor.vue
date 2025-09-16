<script lang="ts" setup>
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'

import { PermissionService } from '@/model/system/permission/PermissionService'
import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new PermissionEntity()))
const {
  isLoading,
  formData,
  formRef,
  title,
  onSubmit,
} = useEditor(props, PermissionService)
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
      :rules="PermissionService.createValidator()"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父权限"
      >
        {{ param.parent.name }}
      </el-form-item>
      <AFormField field="name" />
      <AFormField field="identity" />
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped></style>
