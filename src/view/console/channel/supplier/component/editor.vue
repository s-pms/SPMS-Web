<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        v-for="item in SupplierEntity.getFormFieldConfigList()"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
      >
        <AInput
          v-model="(formData as IJson)[item.key]"
          :modifier="item.key"
          :entity="SupplierEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { IJson } from '@/airpower/interface/IJson'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'

const props = defineProps(airPropsParam(new SupplierEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, SupplierEntity, SupplierService)

</script>
