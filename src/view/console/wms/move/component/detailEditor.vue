<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ADialog, AInput, DialogProps, getFieldLabel } from '@airpower/web'
import { ref } from 'vue'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveDetailService } from '@/model/wms/move/MoveDetailService'

const props = defineProps(DialogProps.withParam(new MoveDetailEntity()))
const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<FormInstance>()

formData.value.quantity = props.param.inventory.quantity
formData.value.billId = props.param.billId

async function onSubmit() {
  props.onConfirm(formData.value)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    title="移库明细"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="MoveDetailService.createValidator()"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="转移物料"
        prop="materialId"
      >
        <el-input
          v-model="formData.inventory.material.name"
          disabled
        />
      </el-form-item>
      <el-form-item
        :label="getFieldLabel(MoveDetailEntity, 'quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="MoveDetailEntity"
          clearable
        >
          <template
            v-if="formData.inventory"
            #append
          >
            {{ formData.inventory.material.unit.name }}
          </template>
        </AInput>
      </el-form-item>
    </el-form>
  </ADialog>
</template>
