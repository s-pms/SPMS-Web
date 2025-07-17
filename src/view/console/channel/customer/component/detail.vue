<script lang="ts" setup>
import { ADialog, AFormField, DialogProps, getFormConfigList, getModelName, useDetail } from '@airpower/web'

import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

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
    :title="getModelName(CustomerEntity) + title"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AFormField
        v-for="item in getFormConfigList(CustomerEntity)"
        :key="item.key"
        :field="item.key"
        disabled
      />
    </el-form>
  </ADialog>
</template>
