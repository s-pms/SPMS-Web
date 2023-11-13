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
        prop="materialId"
      >
        <el-input
          v-model="formData.materialName"
          clearable
          placeholder="请选择物料"
          @clear="formData.exclude('material', 'materialId')"
          @click="selectMaterial()"
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
            {{ formData.material.unitInfo.name }}
          </template>
        </AInput>
      </el-form-item>
      <el-form-item
        :label="PlanDetailEntity.getFieldName('remark')"
        prop="remark"
      >
        <AInput
          v-model.remark="formData.remark"
          :entity="PlanDetailEntity"
        />
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
import { PlanDetailEntity } from '@/model/mes/plan/PlanDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { PlanDetailService } from '@/model/mes/plan/PlanDetailService'

const props = defineProps(airPropsParam(new PlanDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function selectMaterial() {
  formData.value.material = await AirDialog.select(MaterialSelector)
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>
