<template>
  <ADialog
    title="计划明细"
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
      :rules="PlanDetailService.createValidator(formData)"
      @submit.prevent
    >
      <el-form-item
        label="销售物料"
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

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { PlanDetailService } from '@/model/mes/plan/PlanDetailService'

const props = defineProps(airPropsParam(new PlanDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
