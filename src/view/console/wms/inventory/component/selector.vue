<template>
  <ADialog
    :hide-footer="!mult"
    title="选择库存"
    is-selector
    width="60%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <ATable
      :data-list="list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="InventoryEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onConfirm($event)"
    >
      <template #materialCode="row">
        {{ (row.data as InventoryEntity).material.code }}
      </template>
      <template #materialName="row">
        {{ (row.data as InventoryEntity).material.name }}
      </template>
      <template #storageCode="row">
        {{ (row.data as InventoryEntity).storage.code }}
      </template>
      <template #storageName="row">
        {{ (row.data as InventoryEntity).storage.name }}
      </template>
      <template #unitName="row">
        {{ (row.data as InventoryEntity).material.unitInfo.name }}
      </template>
      <template
        v-if="!mult"
        #customRow="{ data }"
      >
        <AButton
          type="SELECT"
          icon-button
          :disabled="data.isDisabled"
          tooltip="选择"
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ATable, ADialog, AButton,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { AirRequest } from '@/airpower/model/AirRequest'

const props = defineProps(airPropsSelector(new InventoryEntity()))

const request = ref(new AirRequest(InventoryEntity))
const list = ref([] as InventoryEntity[])

const isLoading = ref(false)

async function getList() {
  request.value.filter = request.value.filter || new InventoryEntity()
  request.value.filter.type = props.param.type
  request.value.filter.storage = props.param.storage
  list.value = await InventoryService.create(isLoading).getList(request.value)
}

getList()
</script>
<style scoped lang="scss"></style>
