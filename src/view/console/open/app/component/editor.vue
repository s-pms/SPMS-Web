<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'

import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'

const props = defineProps(DialogProps.withParam(new OpenAppEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, OpenAppService)

// todo 这里需要删掉
formData.value.url = formData.value.url || 'https://demo.hamm.cn/app'

async function onAdd() {
  const result = await OpenAppService.create(isLoading).addAndGetSecret(formData.value)
  props.onConfirm(result)
}

async function onSave() {
  if (formData.value.id) {
    onSubmit()
    return
  }
  onAdd()
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    hide-fullscreen
    min-height="100px"
    @cancel="onCancel"
    @confirm="onSave"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField field="appName" />
      <AFormField field="isInternal" />
      <AFormField field="arithmetic" />
      <AFormField field="url" />
      <AFormField field="ipWhiteList" />
    </el-form>
  </ADialog>
</template>
