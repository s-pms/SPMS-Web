<script lang="ts" setup>
import type { ITree } from '@airpower/interface/ITree'
import type { AirPage } from '@airpower/model/AirPage'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { AirRequest } from '@airpower/model/AirRequest'
import { AirRequestPage } from '@airpower/model/AirRequestPage'
import { AirResponsePage } from '@airpower/model/AirResponsePage'
import { APage, APanel, ATable, ATreeBox } from '@airpower/web'
import { computed, ref } from 'vue'

const request = ref(new AirRequestPage(InventoryEntity))
const response = ref<AirResponsePage<InventoryEntity>>(new AirResponsePage())

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

async function getList() {
  request.value.filter = request.value.filter || new InventoryEntity()
  request.value.filter.type = inventoryType.value
  response.value = await InventoryService.create(isLoading).getPage(request.value)
}

async function onPageChanged(page: AirPage) {
  request.value.page = page
  getList()
}

const treePlaceHolder = ref('搜索...')

async function inventoryTypeChanged() {
  switch (inventoryType.value) {
    case InventoryTypeEnum.STORAGE.key:
      treePlaceHolder.value = '搜索仓库...'
      getStorage()
      break
    case InventoryTypeEnum.STRUCTURE.key:
      treePlaceHolder.value = '搜索生产单元...'
      getStructure()
      break
    default:
  }

  treeChanged(undefined)
}

async function treeChanged(current: ITree | undefined) {
  response.value = new AirResponsePage()
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
  }
  else {
    request.value.filter.exclude('storage', 'structure')
  }
  getList()
}

const tableField = computed(() => {
  const list = InventoryEntity.getTableFieldConfigList()
  switch (inventoryType.value) {
    case InventoryTypeEnum.STORAGE.key:
      return list.filter(item => item.key !== 'structureName')
    case InventoryTypeEnum.STRUCTURE.key:
      return list.filter(item => item.key !== 'storageName')
    default:
  }
  return list
})

inventoryTypeChanged()
</script>

<template>
  <ATreeBox
    v-loading="isLoadingTree"
    :placeholder="treePlaceHolder"
    :tree-data="treeData"
    searchable
    @on-change="treeChanged"
  >
    <APanel title="">
      <AToolBar
        :entity="InventoryEntity"
        :service="InventoryService"
        hide-add
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
        :data-list="response.list"
        :entity="InventoryEntity"
        :field-list="tableField"
        ctrl-width="40"
        hide-delete
        hide-edit
      >
        <template #materialCode="{ data }">
          {{ data.material.code }}
        </template>
        <template #materialName="{ data }">
          {{ data.material.name }}
        </template>
        <template #storageName="{ data }">
          {{ data.storage?.name }}({{ data.storage?.code }})
        </template>
        <template #structureName="{ data }">
          {{ data.structure?.name }}({{ data.structure?.code }})
        </template>
        <template #unitName="{ data }">
          {{ data.material.unit.name }}
        </template>
      </ATable>
      <template #footerLeft>
        <APage
          :response="response"
          @on-change="onPageChanged"
        />
      </template>
    </APanel>
  </ATreeBox>
</template>

<style lang="scss" scoped></style>
