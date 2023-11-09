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
        label="客户"
        prop="customerId"
      >
        <el-input
          v-model="formData.customerName"
          clearable
          placeholder="请选择客户"
          @clear="formData.exclude('customer','customerId')"
          @click="selectSupplier()"
        />
      </el-form-item>
      <el-form-item
        :label="SalePriceEntity.getFieldName('price')"
        prop="price"
      >
        <AInput
          v-model.price="formData.price"
          :entity="SalePriceEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { SalePriceEntity } from '@/model/channel/salePrice/SalePriceEntity'
import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { CustomerSelector } from '../../customer/component'

const props = defineProps(airPropsParam(new SalePriceEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, SalePriceEntity, SalePriceService, {
  afterGetDetail(detailData) {
    detailData.customerId = detailData.customer.id
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

async function selectMaterial() {
  formData.value.material = await AirDialog.select(MaterialSelector)
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

async function selectSupplier() {
  formData.value.customer = await AirDialog.select(CustomerSelector)
  formData.value.customerId = formData.value.customer.id
  formData.value.customerName = formData.value.customer.name
}
</script>
