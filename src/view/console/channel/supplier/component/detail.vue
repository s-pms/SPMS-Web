<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, useDetail } from '@airpower/web'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'

const props = defineProps(DialogProps.withParam(new SupplierEntity()))

const {
  formData,
  isLoading,
} = useDetail(props, SupplierService)
</script>

<template>
  <ADialog
    :loading="isLoading"
    title="供应商详情"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AFormField
        field="code"
        readonly
      />
      <AFormField
        field="name"
        readonly
      />
      <AFormField
        field="phone"
        readonly
      />
    </el-form>
  </ADialog>
</template>
