<script lang="ts" setup>
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new MenuEntity()))

const {
  title,
  formData,
  formRef,
  isLoading,
  rules,
  onSubmit,
} = useEditor(props, MenuService)
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
        label="父菜单"
      >
        {{ param.parent.name }}
      </el-form-item>
      <AFormField field="name" />
      <AFormField field="path" />
      <AFormField field="component" />
      <AFormField field="orderNo" />
      <AFormField field="icon" />
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped></style>
