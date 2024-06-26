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
        label="采购物料"
        prop="materialId"
      >
        <el-input
          v-model="formData.materialName"
          clearable
          placeholder="请选择物料"
          @clear="formData.exclude('material','materialId')"
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
          @clear="formData.exclude('supplier','supplierId')"
          @click="selectSupplier()"
        />
      </el-form-item>
      <AFormField field="price" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { SupplierSelector } from '../../supplier/component'

const props = defineProps(airPropsParam(new PurchasePriceEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, PurchasePriceEntity, PurchasePriceService, {
  afterGetDetail(detailData) {
    detailData.supplierId = detailData.supplier.id
    detailData.supplierName = detailData.supplier.name
    detailData.materialId = detailData.material.id
    detailData.materialName = detailData.material.name
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('materialId', 'supplierId')
    return submitData
  },
})

async function selectMaterial() {
  formData.value.material = await AirDialog.select(MaterialSelector)
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

async function selectSupplier() {
  formData.value.supplier = await AirDialog.select(SupplierSelector)
  formData.value.supplierId = formData.value.supplier.id
  formData.value.supplierName = formData.value.supplier.name
}
</script>
