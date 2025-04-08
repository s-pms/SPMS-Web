<script lang="ts" setup>
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { StorageSelector } from '@/view/console/factory/storage/component'
import { AButton, ADialog, AFormField, AGroup, ASelect, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { MoveDetailEditor } from '.'
import { InventorySelector } from '../../inventory/component'

const props = defineProps(airPropsParam(new MoveEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, MoveService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
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
  inventory.type = InventoryTypeEnum.STORAGE.key
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
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="移库单"
      >
        <AFormField field="billCode" />
        <el-form-item
          label="目标仓库"
          prop="storage"
        >
          <ASelect
            v-model="formData.storage"
            :selector="StorageSelector"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="移库明细">
        <ATable
          :data-list="formData.details"
          :entity="MoveDetailEntity"
          :field-list="MoveDetailEntity.getTableFieldConfigList().filter((item) => !['createTime'].includes(item.key))"
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.inventory.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.inventory.material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ MoveEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              icon-button
              type="DELETE"
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
