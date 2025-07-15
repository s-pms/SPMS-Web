<script lang="ts" setup>
import {SupplierEntity} from '@/model/channel/supplier/SupplierEntity'

import {SupplierService} from '@/model/channel/supplier/SupplierService'
import {ADialog, AFormField, DialogProps, getFormConfigList, useEditor} from '@airpower/web'

const props = defineProps(DialogProps.withParam(new SupplierEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, SupplierService)
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
        v-for="item in getFormConfigList(SupplierEntity)"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
