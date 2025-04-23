<script lang="ts" setup>
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

import { ADialog, AFormField } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new CustomerEntity()))

const {
  title,
  formData,
  isLoading,
} = useDetail(props, CustomerService)
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="CustomerEntity.getModelName() + title"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AFormField
        v-for="item in CustomerEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
        disabled
      />
    </el-form>
  </ADialog>
</template>
