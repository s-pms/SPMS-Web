<template>
  <ADialog
    :hide-footer="!mult"
    title="选择库存"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <ATreeBox
      v-loading="isLoadingTree"
      :tree-data="treeData"
      searchable
      :placeholder="treePlaceHolder"
      @on-change="treeChanged"
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
        <template #storageName="row">
          {{ (row.data as InventoryEntity).storage.name }}({{ (row.data as InventoryEntity).storage.code }})
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
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { ITree } from '@/airpower/interface/ITree'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'

const props = defineProps(airPropsSelector(new InventoryEntity()))

const request = ref(new AirRequest(InventoryEntity))
const list = ref([] as InventoryEntity[])

const isLoading = ref(false)
const isLoadingTree = ref(false)

const inventoryType = ref(props.param.type)

const treeData = ref([] as ITree[])

async function getStorage() {
  treeData.value = await StorageService.create(isLoadingTree).getList(new AirRequest(StorageEntity))
}

async function getStructure() {
  treeData.value = await StructureService.create(isLoadingTree).getList(new AirRequest(StructureEntity))
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
  list.value = await InventoryService.create(isLoading).getList(request.value)
}

async function treeChanged(current: ITree | undefined) {
  list.value = []
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
<style scoped lang="scss"></style>
