<template>
  <ADialog
    title="确认入库"
    :form-ref="formRef"
    :loading="isLoading"
    width="600px"
    :disable-confirm="formData.quantity <= 0"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="InputDetailService.createValidator(formData)"
      @submit.prevent
    >
      <el-form-item label="物料信息">
        <el-input
          v-model="material.name"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="目标存储资源"
        prop="storageId"
      >
        <AInput
          v-model="formData.storageName"
          :entity="InputDetailEntity"
          placeholder="请选择目标存储资源..."
          @click="selectStorage"
        />
      </el-form-item>
      <el-form-item label="待入数量">
        <el-input
          v-model="quantity"
          disabled
        >
          <template #append>
            {{ material.unit.name }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="入库数量">
        <el-input
          v-model="formData.quantity"
          type="number"
        >
          <template #append>
            {{ material.unit.name }}
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { AirFormInstance } from '@/airpower/type/AirType'
import { InputDetailService } from '@/model/wms/input/InputDetailService'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { InputService } from '@/model/wms/input/InputService'
import { StorageSelector } from '@/view/console/factory/storage/component'

const props = defineProps(airPropsParam(new InputDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

async function onSubmit() {
  await InputService.create(isLoading).addFinish(formData.value.copy().expose('id', 'quantity', 'billId', 'storage'))
  props.onConfirm()
}

const quantity = ref(formData.value.quantity - formData.value.finishQuantity)
const material = ref(formData.value.material.copy())
formData.value.quantity = quantity.value
formData.value.expose('id', 'quantity')

async function selectStorage() {
  formData.value.storage = await AirDialog.show(StorageSelector)
  formData.value.storageName = formData.value.storage.name
  formData.value.storageId = formData.value.storage.id
}

</script>
