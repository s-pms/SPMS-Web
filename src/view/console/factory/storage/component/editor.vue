<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, getFormConfigList, useEditor } from '@airpower/web'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

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
        v-if="formData.parent"
        label="所属上级"
      >
        {{ formData.parent.name }}({{ formData.parent.code }})
      </el-form-item>
      <AFormField
        v-for="item in getFormConfigList(StorageEntity)"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
