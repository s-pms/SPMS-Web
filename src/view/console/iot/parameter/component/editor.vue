<script lang="ts" setup>
import {ParameterEntity} from '@/model/iot/parameter/ParameterEntity'

import {ParameterService} from '@/model/iot/parameter/ParameterService'
import {ADialog, AFormField, DialogProps, getFormConfigList, useEditor} from '@airpower/web'

const props = defineProps(DialogProps.withParam(new ParameterEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, ParameterService)
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
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
      <AFormField
        v-for="item in getFormConfigList(ParameterEntity)"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
