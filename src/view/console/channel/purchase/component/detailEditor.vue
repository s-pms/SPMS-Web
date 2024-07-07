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
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
          @change="getPurchasePrice()"
        />
      </el-form-item>
      <el-form-item
        label="供应商"
        prop="supplier"
      >
        <ASelect
          v-model="formData.supplier"
          :selector="SupplierSelector"
          @change="getPurchasePrice()"
        />
      </el-form-item>
      <el-form-item
        :label="PurchaseDetailEntity.getFieldName('price')"
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
        :label="PurchaseDetailEntity.getFieldName('quantity')"
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

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PurchaseDetailEntity } from '@/model/channel/purchase/PurchaseDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { SupplierSelector } from '../../supplier/component'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { PurchaseDetailService } from '@/model/channel/purchase/PurchaseDetailService'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam<PurchaseDetailEntity>())

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function getPurchasePrice() {
  if (formData.value.materialId && formData.value.supplierId) {
    const purchasePrice = await PurchasePriceService.create(isLoading).getByMaterialAndSupplier(formData.value.materialId, formData.value.supplierId)
    if (purchasePrice) {
      formData.value.price = purchasePrice.price
      return
    }
    AirNotification.create().setDuration(5000).info('该供应商未提供该物料的采购报价，将自动填写该物料的参考报价')
    formData.value.price = formData.value.material.purchasePrice
  }
}

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
