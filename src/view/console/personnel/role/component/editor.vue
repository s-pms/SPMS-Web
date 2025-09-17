<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'

import { RoleService } from '@/model/personnel/role/RoleService'
import { ADialog, AFormField, DialogProps, useEditor, WebValidator } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new RoleEntity()))

const {
  formRef,
  isLoading,
  formData,
  rules,
  title,
  onSubmit,
} = useEditor(props, RoleService, {
  customRules: {
    name: [WebValidator.show('不允许带管理员三个字').ifContain('管理员')],
  },
})
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
      <AFormField field="name" />
      <AFormField field="code" />
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped></style>
