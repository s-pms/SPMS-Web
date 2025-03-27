<template>
  <ADialog
    :loading="isLoading"
    :title="CustomerEntity.getModelName() + title"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
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

<script lang="ts" setup>
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirDetail } from '@airpower/hook/useAirDetail'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

const props = defineProps(airPropsParam(new CustomerEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, CustomerEntity, CustomerService)

</script>
