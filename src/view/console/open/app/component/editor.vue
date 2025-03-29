<script lang="ts" setup>
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new OpenAppEntity()))

const { title, formData, rules, formRef, isLoading, onSubmit } = useAirEditor(props, OpenAppEntity, OpenAppService)

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
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    min-height="100px"
    @on-confirm="onSave"
    @on-cancel="onCancel"
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
