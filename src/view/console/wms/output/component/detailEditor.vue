<script lang="ts" setup>
import type { AirFormInstance } from '@airpower/type/AirType'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputDetailService } from '@/model/wms/output/OutputDetailService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { ADialog, AInput, ASelect } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new OutputDetailEntity()))

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
    title="出库明细"
    width="600px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="OutputDetailService.createValidator(formData)"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item
        label="物料信息"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
        />
      </el-form-item>
      <el-form-item
        :label="OutputDetailEntity.getFieldName('quantity')"
        prop="quantity"
      >
        <AInput
          v-model.quantity="formData.quantity"
          :entity="OutputDetailEntity"
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

<style lang="sass" scoped></style>
