<script lang="ts" setup>
import { ADialog, AFormField, ASelect, DialogProps, useEditor } from '@airpower/web'
import { SalePriceEntity } from '@/model/channel/salePrice/SalePriceEntity'

import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { CustomerSelector } from '../../customer/component'

const props = defineProps(DialogProps.withParam(new SalePriceEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, SalePriceService, {
  afterGetDetail(detailData) {
    detailData.customerName = detailData.customer.name
    detailData.materialId = detailData.material.id
    detailData.materialName = detailData.material.name
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('materialId', 'customerId')
    return submitData
  },
})
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
        label="采购物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        label="客户"
        prop="customer"
      >
        <ASelect
          v-model="formData.customer"
          :selector="CustomerSelector"
        />
      </el-form-item>
      <AFormField field="price" />
    </el-form>
  </ADialog>
</template>
