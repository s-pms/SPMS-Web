<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="移库单"
        :column="2"
      >
        <el-form-item
          :label="MoveEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="MoveEntity"
          />
        </el-form-item>
        <el-form-item
          label="目标存储资源"
          prop="storageId"
        >
          <el-input
            v-model="formData.storageName"
            clearable
            placeholder="请选择目标存储资源"
            @clear="formData.exclude('storage', 'storageId')"
            @click="selectStorage()"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="移库明细">
        <ATable
          :entity="MoveDetailEntity"
          :data-list="formData.details"
          :field-list="MoveDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="row">
            {{ (row.data as MoveDetailEntity).inventory.material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as MoveDetailEntity).inventory.material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ MoveEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="row">
            <AButton
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(row.index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AGroup, ATable, AButton, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { MoveDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { StorageSelector } from '@/view/console/factory/storage/component'
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryType } from '@/model/wms/inventory/InventoryType'
import { InventorySelector } from '../../inventory/component'

const props = defineProps(airPropsParam(new MoveEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, MoveEntity, MoveService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
    detailData.storageCode = detailData.storage.code
    detailData.storageId = detailData.storage.id
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      AirNotification.warning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  let inventory = new InventoryEntity()
  inventory.type = InventoryType.STORAGE
  inventory = await AirDialog.select(InventorySelector, inventory)
  let detail = new MoveDetailEntity()
  detail.inventory = inventory
  detail = await AirDialog.show(MoveDetailEditor, detail)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}

async function selectStorage() {
  formData.value.storage = await AirDialog.select(StorageSelector)
  formData.value.storageId = formData.value.storage.id
  formData.value.storageName = formData.value.storage.name
}
</script>
