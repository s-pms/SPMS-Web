<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
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

<script lang="ts" setup>
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirDetail } from '@airpower/hook/useAirDetail'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'

const props = defineProps(airPropsParam(new SupplierEntity()))

const {
  title, formData, isLoading,
} = useAirDetail(props, SupplierEntity, SupplierService)

</script>
