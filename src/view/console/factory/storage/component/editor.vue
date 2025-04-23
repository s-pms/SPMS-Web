<script lang="ts" setup>
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

import { ADialog, AFormField, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new StorageEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, StorageService)
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
      <el-form-item
        v-if="formData.parent"
        label="所属上级"
      >
        {{ formData.parent.name }}({{ formData.parent.code }})
      </el-form-item>
      <AFormField
        v-for="item in StorageEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
