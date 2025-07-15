<script lang="ts" setup>
import {BomDetailEntity} from '@/model/mes/bom/BomDetailEntity'
import {BomDetailService} from '@/model/mes/bom/BomDetailService'
import {MaterialSelector} from '@/view/console/asset/material/component'

import {ADialog, AInput, ASelect, DialogProps, getFieldLabel} from '@airpower/web'
import type {FormInstance} from 'element-plus'
import {ref} from 'vue'

const props = defineProps(DialogProps.withParam(new BomDetailEntity()))

const formData = ref(props.param.copy())
if (formData.value.material) {
  formData.value.materialName = formData.value.material.name
  formData.value.materialCode = formData.value.material.code
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
    title="配方明细"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="BomDetailService.createValidator()"
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
        :label="getFieldLabel(BomDetailEntity, 'quantity')"
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
