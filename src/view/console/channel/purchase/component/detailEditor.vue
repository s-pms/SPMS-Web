<script lang="ts" setup>
import {PurchaseDetailEntity} from '@/model/channel/purchase/PurchaseDetailEntity'
import {PurchaseDetailService} from '@/model/channel/purchase/PurchaseDetailService'
import {PurchasePriceService} from '@/model/channel/purchasePrice/PurchasePriceService'
import {MaterialSelector} from '@/view/console/asset/material/component'
import {ADialog, AInput, ASelect, DialogProps, FeedbackUtil, getFieldLabel} from '@airpower/web'
import type {FormInstance} from 'element-plus'
import {ref} from 'vue'
import {SupplierSelector} from '../../supplier/component'

const props = defineProps(DialogProps.withParam(new PurchaseDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<FormInstance>()

async function getPurchasePrice() {
  if (formData.value.material && formData.value.supplier) {
    const purchasePrice = await PurchasePriceService.create(isLoading).getByMaterialAndSupplier(
      formData.value.material.id,
      formData.value.supplier.id,
    )
    if (purchasePrice) {
      formData.value.price = purchasePrice.price
      return
    }
    FeedbackUtil.toastWarning('该供应商未提供该物料的采购报价，将自动填写该物料的参考报价')
    formData.value.price = formData.value.material.purchasePrice
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
    title="采购明细"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="PurchaseDetailService.createValidator()"
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
          @changed="getPurchasePrice()"
        />
      </el-form-item>
      <el-form-item
        label="供应商"
        prop="supplier"
      >
        <ASelect
          v-model="formData.supplier"
          :selector="SupplierSelector"
          @changed="getPurchasePrice()"
        />
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(PurchaseDetailEntity, 'price')"
        prop="price"
      >
        <AInput
          v-model.price="formData.price"
          :entity="PurchaseDetailEntity"
        >
          <template
            v-if="formData.material"
            #append
          >
            元/{{ formData.material.unit.name }}
          </template>
        </AInput>
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(PurchaseDetailEntity, 'quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="PurchaseDetailEntity"
          clearable
        >
          <template
            v-if="formData.material"
            #append
          >
            {{ formData.material.unit.name }}
          </template>
        </AInput>
      </el-form-item>
    </el-form>
  </ADialog>
</template>
