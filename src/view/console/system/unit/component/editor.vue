<script lang="ts" setup>
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'

import { ADialog, AFormField, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new UnitEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, UnitService)
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
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
      <AFormField
        v-for="item in UnitEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
