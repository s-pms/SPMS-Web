<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import { ADialog, AInput, ASelect, DialogProps, getFieldLabel } from '@airpower/web'
import { ref } from 'vue'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanDetailService } from '@/model/mes/plan/PlanDetailService'
import { MaterialSelector } from '@/view/console/asset/material/component'

const props = defineProps(DialogProps.withParam(new PlanDetailEntity()))

const formData: Ref<PlanDetailEntity> = ref(props.param.copy())

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
    title="计划明细"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="PlanDetailService.createValidator()"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="计划物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        v-if="formData.material"
        :label="getFieldLabel(PlanDetailEntity, 'quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="PlanDetailEntity"
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
