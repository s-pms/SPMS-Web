<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    height="70%"
    is-selector
    title="选择库存"
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <ATreeBox
      v-loading="isLoadingTree"
      :placeholder="treePlaceHolder"
      :tree-data="treeData"
      searchable
      @on-change="treeChanged"
    >
      <ATable
        :ctrl-width="80"
        :data-list="list"
        :entity="InventoryEntity"
        :hide-ctrl="isMultiple"
        :select-list="selectList"
        :show-select="isMultiple"
        hide-delete
        hide-edit
        hide-field-selector
        @on-select="onConfirm"
      >
        <template #materialCode="{ data }">
          {{ data.material.code }}
        </template>
        <template #materialName="{ data }">
          {{ data.material.name }}
        </template>
        <template #storageName="{ data }">
          {{ data.storage.name }}({{ data.storage.code }})
        </template>
        <template #unitName="{ data }">
          {{ data.material.unit.name }}
        </template>
        <template
          v-if="!isMultiple"
          #customRow="{ data }"
        >
          <AButton
            :disabled="data.isDisabled"
            icon-button
            tooltip="选择"
            type="SELECT"
            @click="
              onConfirm(data)
            "
          />
        </template>
      </ATable>
    </ATreeBox>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  AButton, ADialog, ATable, ATreeBox,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { AirRequest } from '@/airpower/model/AirRequest'
import { ITree } from '@/airpower/interface/ITree'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { InventoryService } from '@/model/wms/inventory/InventoryService'

const props = defineProps(airPropsSelector<InventoryEntity>())

const request = ref(new AirRequest(InventoryEntity))
const list = ref<InventoryEntity[]>([])

const isLoading = ref(false)
const isLoadingTree = ref(false)

const inventoryType = ref(props.param.type)

const treeData = ref<ITree[]>([])

async function getStorage() {
  treeData.value = await StorageService.create(isLoadingTree)
    .getList(new AirRequest(StorageEntity))
}

async function getStructure() {
  treeData.value = await StructureService.create(isLoadingTree)
    .getList(new AirRequest(StructureEntity))
}

const treePlaceHolder = ref('搜索...')

async function inventoryTypeChanged() {
  switch (inventoryType.value) {
    case InventoryTypeEnum.STORAGE.key:
      treePlaceHolder.value = '搜索存储资源...'
      getStorage()
      break
    case InventoryTypeEnum.STRUCTURE.key:
      treePlaceHolder.value = '搜索工厂结构...'
      getStructure()
      break
    default:
  }
  // eslint-disable-next-line no-use-before-define
  treeChanged(undefined)
}

async function getList() {
  request.value.filter = request.value.filter || new InventoryEntity()
  request.value.filter.type = inventoryType.value
  list.value = await InventoryService.create(isLoading)
    .getList(request.value)
}

async function treeChanged(current: ITree | undefined) {
  // list.value = []
  if (current) {
    switch (inventoryType.value) {
      case InventoryTypeEnum.STORAGE.key:
        request.value.filter.storage = (current as StorageEntity).copy()
        request.value.filter.storage.expose('id')
        break
      case InventoryTypeEnum.STRUCTURE.key:
        request.value.filter.structure = (current as StructureEntity).copy()
        request.value.filter.structure.expose('id')
        break
      default:
    }
  } else {
    request.value.filter.exclude('storage', 'structure')
  }
  getList()
}

inventoryTypeChanged()
</script>
<style lang="scss" scoped></style>
