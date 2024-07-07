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
      <AFormField
        field="price"
      />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
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
</script>
