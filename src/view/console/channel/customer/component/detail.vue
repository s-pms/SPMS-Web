<template>
  <ADialog
    :title="CustomerEntity.getModelName() + title"
    :loading="isLoading"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        v-for="item in CustomerEntity.getFormFieldConfigList()"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
      >
        <AInput
          v-model="(formData as IJson)[item.key]"
          :modifier="item.key"
          :entity="CustomerEntity"
          disabled
          placeholder="暂无数据"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { IJson } from '@/airpower/interface/IJson'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

const props = defineProps(airPropsParam(new CustomerEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, CustomerEntity, CustomerService)

</script>
