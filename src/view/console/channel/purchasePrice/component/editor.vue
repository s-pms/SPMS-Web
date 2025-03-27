<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
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
        label="供应商"
        prop="supplier"
      >
        <ASelect
          v-model="formData.supplier"
          :selector="SupplierSelector"
        />
      </el-form-item>
      <AFormField field="price" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField, ASelect } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { PurchasePriceEntity } from '@/model/channel/purchasePrice/PurchasePriceEntity'
import { PurchasePriceService } from '@/model/channel/purchasePrice/PurchasePriceService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { SupplierSelector } from '../../supplier/component'

const props = defineProps(airPropsParam(new PurchasePriceEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, PurchasePriceEntity, PurchasePriceService, {})
</script>
