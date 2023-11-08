<template>
  <ADialog
    title="采购明细"
    :form-ref="formRef"
    :loading="isLoading"
    width="600px"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="PurchaseDetailService.createValidator(formData)"
      @submit.prevent
    >
      <el-form-item
        label="采购物料"
        prop="materialId"
      >
        <el-input
          v-model="formData.materialName"
          clearable
          placeholder="请选择物料"
          @clear="formData.exclude('material', 'materialId')"
          @click="selectMaterial()"
        />
      </el-form-item>
      <el-form-item
        label="供应商"
        prop="supplierId"
      >
        <el-input
          v-model="formData.supplierName"
          clearable
          placeholder="请选择供应商"
          @clear="formData.exclude('supplier', 'supplierId')"
          @click="selectSupplier()"
        />
      </el-form-item>
      <el-form-item
        :label="PurchaseDetailEntity.getFieldName('purchasePrice')"
        prop="purchasePrice"
      >
        <AInput
          v-model.purchasePrice="formData.purchasePrice"
          :entity="PurchaseDetailEntity"
        />
      </el-form-item>
      <el-form-item
        :label="PurchaseDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="PurchaseDetailEntity"
        />
      </el-form-item>
      <el-form-item
        :label="PurchaseDetailEntity.getFieldName('remark')"
        prop="remark"
      >
        <AInput
          v-model.remark="formData.remark"
          :entity="PurchaseDetailEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ADialog, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { SupplierSelector } from '../../supplier/component'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { PurchaseDetailService } from '@/model/channel/purchase/PurchaseDetailService'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new PurchaseDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function getPurchasePrice() {
  if (formData.value.materialId && formData.value.supplierId) {
    const purchasePrice = await PurchasePriceService.create(isLoading).getByMaterialAndSupplier(formData.value.materialId, formData.value.supplierId)
    if (purchasePrice) {
      formData.value.purchasePrice = purchasePrice.purchasePrice
      return
    }
    await AirNotification.warning('该供应商未提供该物料的采购报价，将自动填写该物料的参考报价')
    formData.value.purchasePrice = formData.value.material.purchasePrice
  }
}

async function selectMaterial() {
  formData.value.material = await AirDialog.select(MaterialSelector)
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
  getPurchasePrice()
}

async function selectSupplier() {
  formData.value.supplier = await AirDialog.select(SupplierSelector)
  formData.value.supplierId = formData.value.supplier.id
  formData.value.supplierName = formData.value.supplier.name
  getPurchasePrice()
}

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
