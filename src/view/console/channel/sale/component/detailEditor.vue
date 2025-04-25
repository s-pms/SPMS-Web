<script lang="ts" setup>
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleDetailService } from '@/model/channel/sale/SaleDetailService'
import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'

import { MaterialSelector } from '@/view/console/asset/material/component'
import { ADialog, AInput, ASelect, DialogProps, FeedbackUtil, getFieldLabel } from '@airpower/web'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

const props = defineProps(DialogProps.withParam(new SaleDetailEntity()))

const formData = ref(props.param.copy())
const isLoading = ref(false)

const formRef = ref<FormInstance>()

async function getSalePrice() {
  if (formData.value.materialId && formData.value.customer) {
    const salePrice = await SalePriceService.create(isLoading).getByMaterialAndCustomer(
      formData.value.materialId,
      formData.value.customer.id,
    )
    if (salePrice) {
      formData.value.price = salePrice.price
      return
    }
    FeedbackUtil.toastWarning('未配置该物料对该客户的特别销售价，将自动填写该物料的参考销售价')
    formData.value.price = formData.value.material.salePrice
  }
}

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    title="销售明细"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="SaleDetailService.createValidator()"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="销售物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
          @change="getSalePrice()"
        />
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(SaleDetailEntity, 'price')"
        prop="price"
      >
        <AInput
          v-model.price="formData.price"
          :entity="SaleDetailEntity"
        >
          <template
            v-if="formData.material"
            #append
          >
            元/{{ formData.material?.unit?.name }}
          </template>
        </AInput>
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(SaleDetailEntity, 'quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="SaleDetailEntity"
          clearable
        >
          <template
            v-if="formData.material"
            #append
          >
            {{ formData.material?.unit?.name }}
          </template>
        </AInput>
      </el-form-item>
    </el-form>
  </ADialog>
</template>
