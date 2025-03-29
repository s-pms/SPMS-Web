<script lang="ts" setup>
import type { AirFormInstance } from '@airpower/type/AirType'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { PlanDetailService } from '@/model/mes/plan/PlanDetailService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { ADialog, AInput, ASelect } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new PlanDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

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
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="PlanDetailService.createValidator(formData)"
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
        :label="PlanDetailEntity.getFieldName('quantity')"
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
