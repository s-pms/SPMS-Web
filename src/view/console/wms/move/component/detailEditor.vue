<script lang="ts" setup>
import type { AirFormInstance } from '@airpower/type/AirType'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveDetailService } from '@/model/wms/move/MoveDetailService'
import { ADialog, AInput } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new MoveDetailEntity()))
const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

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
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="MoveDetailService.createValidator(formData)"
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
        :label="MoveDetailEntity.getFieldName('quantity')"
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
