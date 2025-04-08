<script lang="ts" setup>
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new SupplierEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, SupplierService)
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
        v-for="item in SupplierEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>
