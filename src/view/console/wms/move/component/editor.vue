<script lang="ts" setup>
import { InventoryEntity } from '@/model/wms/inventory/InventoryEntity'
import { InventoryTypeEnum } from '@/model/wms/inventory/InventoryTypeEnum'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'

import { StorageSelector } from '@/view/console/factory/storage/component'
import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ASelect,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getFieldLabel,
  getTableConfigList,
  useEditor,
} from '@airpower/web'
import { MoveDetailEditor } from '.'
import { InventorySelector } from '../../inventory/component'

const props = defineProps(DialogProps.withParam(new MoveEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, MoveService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      FeedbackUtil.toastWarning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  let inventory = new InventoryEntity()
  inventory.type = InventoryTypeEnum.STORAGE.key
  inventory = await DialogUtil.select(InventorySelector, inventory)
  let detail = new MoveDetailEntity()
  detail.inventory = inventory
  detail = await DialogUtil.show(MoveDetailEditor, detail)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的计划明细？')
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
    @cancel="onCancel"
    @confirm="onSubmit"
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
          :column-list="getTableConfigList(MoveDetailEntity).filter((item) => !['createTime'].includes(item.key))"
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
              icon="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(MoveEntity, 'details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              link
              @click="deleteDetail(index)"
            >
              删除
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
