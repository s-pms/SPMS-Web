<script lang="ts" setup>
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'

import { UnitSelector } from '@/view/console/system/unit/component'
import { ADialog, AFormField, ASelect, DialogProps, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new MaterialEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, MaterialService)
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
      <AFormField field="name" />
      <AFormField field="code" />
      <AFormField field="materialType" />
      <AFormField field="useType" />
      <AFormField field="spc" />
      <el-form-item
        label="计量单位"
        prop="unit"
      >
        <ASelect
          v-model="formData.unit"
          :selector="UnitSelector"
        />
      </el-form-item>
      <AFormField field="purchasePrice" />
      <AFormField field="salePrice" />
    </el-form>
  </ADialog>
</template>
