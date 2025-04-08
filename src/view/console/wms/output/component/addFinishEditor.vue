<script lang="ts" setup>
import type { AirFormInstance } from '@airpower/type/AirType'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputDetailService } from '@/model/wms/output/OutputDetailService'
import { OutputService } from '@/model/wms/output/OutputService'
import { ADialog, AInput } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import { ref } from 'vue'
import { InventorySelector } from '../../inventory/component'

const props = defineProps(airPropsParam(new OutputDetailEntity()))

const formData = ref(props.param.copy())

const isLoading = ref(false)

const formRef = ref<AirFormInstance>()

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
  inventory = await AirDialog.show(InventorySelector, inventory)
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
