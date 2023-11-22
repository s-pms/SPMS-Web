<template>
  <ADialog
    title="出库明细"
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
      :rules="OutputDetailService.createValidator(formData)"
      @submit.prevent
    >
      <el-form-item
        label="物料信息"
        prop="materialId"
      >
        <el-input
          v-model="formData.materialName"
          clearable
          placeholder="请选择物料..."
          @click="selectMaterial"
          @clear="formData.exclude('material', 'materialName', 'materialId')"
        />
      </el-form-item>
      <el-form-item
        :label="OutputDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="OutputDetailEntity"
          clearable
        >
          <template
            v-if="formData.material"
            #append
          >
            {{ formData.material.unitInfo.name }}
          </template>
        </AInput>
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
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { OutputDetailService } from '@/model/wms/output/OutputDetailService'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialSelector } from '@/view/console/asset/material/component'

const props = defineProps(airPropsParam(new OutputDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function onSubmit() {
  props.onConfirm(formData.value)
}

async function selectMaterial() {
  formData.value.material = await AirDialog.show(MaterialSelector)
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}
</script>
