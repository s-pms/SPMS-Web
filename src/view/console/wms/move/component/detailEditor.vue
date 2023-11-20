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
        label="销售物料"
        prop="materialId"
      >
        <el-input
          v-model="formData.materialName"
          clearable
          placeholder="请选择物料"
          :disabled="props.param.material"
          @clear="formData.exclude('material', 'materialId')"
          @click="selectMaterial()"
        />
      </el-form-item>
      <el-form-item
        :label="MoveDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="MoveDetailEntity"
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
        :label="MoveDetailEntity.getFieldName('remark')"
        prop="remark"
      >
        <AInput
          v-model.remark="formData.remark"
          :entity="MoveDetailEntity"
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
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { MoveDetailService } from '@/model/wms/move/MoveDetailService'

const props = defineProps(airPropsParam(new MoveDetailEntity()))

const formData = ref(props.param.copy())
if (formData.value.material) {
  formData.value.materialId = formData.value.material.id
  formData.value.materialName = formData.value.material.name
}

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
