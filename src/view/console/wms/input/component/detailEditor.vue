<template>
  <ADialog
    title="入库明细"
    :form-ref="formRef"
    :loading="isLoading"
    width="600px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="InputDetailService.createValidator(formData)"
      @submit.prevent
    >
      <el-form-item
        label="入库物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        :label="InputDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="InputDetailEntity"
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
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { InputDetailService } from '@/model/wms/input/InputDetailService'

const props = defineProps(airPropsParam(new InputDetailEntity()))

const formData = ref(props.param.copy())
if (formData.value.material) {
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
