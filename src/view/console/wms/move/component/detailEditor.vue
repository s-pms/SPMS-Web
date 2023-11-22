<template>
  <ADialog
    title="移库明细"
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
      :rules="MoveDetailService.createValidator(formData)"
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
            {{ formData.inventory.material.unitInfo.name }}
          </template>
        </AInput>
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
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { MoveDetailService } from '@/model/wms/move/MoveDetailService'

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
