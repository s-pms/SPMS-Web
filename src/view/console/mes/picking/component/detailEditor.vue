<script lang="ts" setup>
import type { AirFormInstance } from '@airpower/type/AirType'
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { PickingDetailService } from '@/model/mes/picking/PickingDetailService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { ADialog, AInput, ASelect } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new PickingDetailEntity()))

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
    title="申领明细"
    width="600px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="PickingDetailService.createValidator(formData)"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="申领物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        :label="PickingDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="PickingDetailEntity"
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
