<template>
  <ATreeBox
    v-loading="isLoadingTree"
    :tree-data="treeData"
    searchable
    :placeholder="treePlaceHolder"
    @on-change="treeChanged"
  >
    <APanel>
      <AToolBar
        hide-add
        :entity="InventoryEntity"
        :service="InventoryService"
      >
        <template #afterButton>
          <el-radio-group
            v-model="inventoryType"
            @change="inventoryTypeChanged"
          >
            <el-radio-button
              v-for="view in InventoryTypeEnum.toDictionary()"
              :key="view.key"
              :label="view.key"
              :value="view.key"
            >
              {{ view.label }}
            </el-radio-button>
          </el-radio-group>
        </template>
      </AToolBar>
      <ATable
        v-loading="isLoading"
        :data-list="list"
        :entity="InventoryEntity"
        hide-delete
        hide-edit
        :ctrl-width="40"
      >
        <template #materialCode="row">
          {{ row.data.material.code }}
        </template>
        <template #materialName="row">
          {{ row.data.material.name }}
        </template>
        <template #storageName="row">
          {{ row.data.storage.name }}({{ row.data.storage.code }})
        </template>
        <template #unitName="row">
          {{ row.data.material.unitInfo.name }}
        </template>
      </ATable>
    </APanel>
  </ATreeBox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, ATable, AToolBar, ATreeBox,
} from '@/airpower/component'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { ITree } from '@/airpower/interface/ITree'
import { StorageService } from '@/model/factory/storage/StorageService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'

const request = ref(new AirRequest(InventoryEntity))
const list = ref<InventoryEntity[]>([])

const isLoading = ref(false)
const isLoadingTree = ref(false)

const inventoryType = ref(InventoryTypeEnum.STORAGE.key)

const treeData = ref<ITree[]>([])

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
        request.value.filter.storage.exposeId()
        break
      case InventoryTypeEnum.STRUCTURE.key:
        request.value.filter.structure = (current as StructureEntity).copy()
        request.value.filter.structure.exposeId()
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
