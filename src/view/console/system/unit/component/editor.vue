<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, getFormConfigList, useEditor } from '@airpower/web'

import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'

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
        v-for="item in getFormConfigList(UnitEntity)"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
