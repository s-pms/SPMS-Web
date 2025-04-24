<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputDetailService } from '@/model/wms/input/InputDetailService'

import { MaterialSelector } from '@/view/console/asset/material/component'
import { ADialog, AInput, ASelect, DialogProps, getFieldLabel } from '@airpower/web'
import { ref } from 'vue'

const props = defineProps(DialogProps.withParam(new InputDetailEntity()))

const formData = ref(props.param.copy())
if (formData.value.material) {
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

const isLoading = ref(false)

const formRef = ref<FormInstance>()

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    title="入库明细"
    width="600px"
    @confirm="onSubmit"
    @cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="InputDetailService.createValidator()"
      label-width="120px"
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
        :label="getFieldLabel(InputDetailEntity, 'quantity')"
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
