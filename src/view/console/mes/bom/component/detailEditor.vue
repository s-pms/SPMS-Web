<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    title="配方明细"
    width="600px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="BomDetailService.createValidator(formData)"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="所需物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        :label="BomDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="BomDetailEntity"
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
import { AirFormInstance } from '@/airpower/type/AirType'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomDetailService } from '@/model/mes/bom/BomDetailService'

const props = defineProps(airPropsParam(new BomDetailEntity()))

const formData = ref(props.param.copy())
if (formData.value.material) {
  formData.value.materialName = formData.value.material.name
  formData.value.materialCode = formData.value.material.code
}

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
