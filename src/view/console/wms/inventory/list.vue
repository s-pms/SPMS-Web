<script lang="ts" setup>
import type { ITree, QueryPage, RootEntity } from '@airpower/web'
import {
  APage,
  APanel,
  ATable,
  ATreeBox,
  getTableConfigList,
  QueryRequest,
  QueryRequestPage,
  QueryResponsePage,
} from '@airpower/web'
import { computed, ref } from 'vue'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryService } from '@/model/wms/inventory/InventoryService'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'

const request = ref(new QueryRequestPage(InventoryEntity))
const response = ref<QueryResponsePage<InventoryEntity>>(new QueryResponsePage())

const isLoading = ref(false)
const isLoadingTree = ref(false)

const inventoryType = ref(InventoryTypeEnum.STORAGE.key)

const treeData = ref<Array<ITree & RootEntity>>([])

async function getStorage() {
  treeData.value = await StorageService.create(isLoadingTree).getList(new QueryRequest(StorageEntity))
}

async function getStructure() {
  treeData.value = await StructureService.create(isLoadingTree).getList(new QueryRequest(StructureEntity))
}

async function getList() {
  request.value.filter = request.value.filter || new InventoryEntity()
  request.value.filter.type = inventoryType.value
  response.value = await InventoryService.create(isLoading).getPage(request.value)
}

async function onPageChanged(page: QueryPage) {
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
  response.value = new QueryResponsePage()
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
  }
  else {
    request.value.filter.exclude('storage', 'structure')
  }
  getList()
}

const tableField = computed(() => {
  const list = getTableConfigList(InventoryEntity)
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
    @changed="treeChanged"
  >
    <APanel>
      <ATable
        v-loading="isLoading"
        :column-list="tableField"
        :data-list="response.list"
        :entity="InventoryEntity"
        :service="InventoryService"
        ctrl-width="60"
        hide-add
        hide-delete
        hide-edit
      >
        <template #afterButton>
          <el-radio-group
            v-model="inventoryType"
            @change="inventoryTypeChanged"
          >
            <el-radio-button
              v-for="view in InventoryTypeEnum.toArray()"
              :key="view.key"
              :label="view.key"
              :value="view.key"
            >
              {{ view.label }}
            </el-radio-button>
          </el-radio-group>
        </template>
        <template #beforePage>
          <APage
            :response="response"
            @changed="onPageChanged"
          />
        </template>
      </ATable>
    </APanel>
  </ATreeBox>
</template>

<style lang="scss" scoped></style>
