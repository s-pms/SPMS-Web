<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import { ADialog, AInput, DialogProps, DialogUtil } from '@airpower/web'
import { ref } from 'vue'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputDetailService } from '@/model/wms/output/OutputDetailService'
import { OutputService } from '@/model/wms/output/OutputService'
import { InventorySelector } from '../../inventory/component'

const props = defineProps(DialogProps.withParam(new OutputDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<FormInstance>()

async function onSubmit() {
  await OutputService.create(isLoading).addDetailFinishQuantity(
    formData.value.copy().expose('id', 'quantity', 'billId', 'inventory'),
  )
  props.onConfirm()
}

const quantity = ref(formData.value.quantity - formData.value.finishQuantity)
const material = ref(formData.value.material.copy())
formData.value.expose('id', 'quantity')

async function selectInventory() {
  let inventory = new InventoryEntity()
  inventory.type = InventoryTypeEnum.STORAGE.key
  inventory.material = material.value.copy()
  inventory = await DialogUtil.show(InventorySelector, inventory)
  formData.value.inventory = inventory.copy()
  formData.value.inventoryId = formData.value.inventory.id
  formData.value.storageName = formData.value.inventory.storage.name
  formData.value.quantity = Math.min(
    formData.value.inventory.quantity,
    quantity.value,
  )
}
</script>

<template>
  <ADialog
    :disable-confirm="formData.quantity <= 0"
    :form-ref="formRef"
    :loading="isLoading"
    title="确认出库"
    width="600px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="OutputDetailService.createValidator()"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item label="物料信息">
        <el-input
          v-model="material.name"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="库存来源"
        prop="inventoryId"
      >
        <AInput
          v-model="formData.storageName"
          :entity="OutputDetailEntity"
          placeholder="请选择库存来源..."
          @click="selectInventory"
        />
      </el-form-item>
      <el-form-item
        v-if="formData.inventory"
        label="当前库存"
      >
        <el-input
          v-model="formData.inventory.quantity"
          disabled
        >
          <template #append>
            {{ material.unit.name }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="待出数量">
        <el-input
          v-model="quantity"
          disabled
        >
          <template #append>
            {{ material.unit.name }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="出库数量">
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

<style lang="sass" scoped></style>
