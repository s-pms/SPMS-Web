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
              v-for="view in InventoryTypeDictionary"
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
import { InventoryType } from '@/model/wms/inventory/InventoryType'
import { InventoryTypeDictionary } from '@/model/wms/inventory/InventoryTypeDictionary'
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { ITree } from '@/airpower/interface/ITree'
import { StorageService } from '@/model/factory/storage/StorageService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'

const request = ref(new AirRequest(InventoryEntity))
const list = ref([] as InventoryEntity[])

const isLoading = ref(false)
const isLoadingTree = ref(false)

const inventoryType = ref(InventoryType.STORAGE)

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
    case InventoryType.STORAGE:
      treePlaceHolder.value = '搜索存储资源...'
      getStorage()
      break
    case InventoryType.STRUCTURE:
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
      case InventoryType.STORAGE:
        request.value.filter.storage = (current as StorageEntity).copy()
        request.value.filter.storage.expose('id')
        break
      case InventoryType.STRUCTURE:
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
