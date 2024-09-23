<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    min-height="100px"
    @on-confirm="onSave"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AFormField field="appName" />
      <AFormField field="arithmetic" />
      <AFormField field="url" />
      <AFormField field="ipWhiteList" />
      <AFormField field="remark" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'

const props = defineProps(airPropsParam(new OpenAppEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, OpenAppEntity, OpenAppService)

// todo 这里需要删掉
formData.value.url = formData.value.url || 'https://hamm.cn/callback'

async function onAdd() {
  const result = await OpenAppService.create(isLoading)
    .addAndGetSecret(formData.value)
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
