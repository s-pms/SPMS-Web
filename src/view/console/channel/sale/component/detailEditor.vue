<template>
  <ADialog
    title="销售明细"
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
      :rules="SaleDetailService.createValidator(formData)"
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
        :label="SaleDetailEntity.getFieldName('price')"
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
        :label="SaleDetailEntity.getFieldName('quantity')"
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

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { SalePriceService } from '@/model/channel/salePrice/SalePriceService'
import { SaleDetailService } from '@/model/channel/sale/SaleDetailService'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new SaleDetailEntity()))

const formData = ref(props.param.copy())
const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function getSalePrice() {
  if (formData.value.materialId && formData.value.customer) {
    const salePrice = await SalePriceService.create(isLoading).getByMaterialAndCustomer(formData.value.materialId, formData.value.customer.id)
    if (salePrice) {
      formData.value.price = salePrice.price
      return
    }
    AirNotification.create().setDuration(5000).info('未配置该物料对该客户的特别销售价，将自动填写该物料的参考销售价')
    formData.value.price = formData.value.material.salePrice
  }
}

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
