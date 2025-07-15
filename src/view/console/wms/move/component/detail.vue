<script lang="ts" setup>
import {AButton, ADialog, AFormField, AGroup, ATable, DialogProps, getTableConfigList} from '@airpower/web'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'

import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'

const props = defineProps(DialogProps.withParam(new MoveEntity()))

const {
  formData,
  isLoading,
  addDetailFinishQuantity,
} = useBillDetail(props, MoveService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
    return detailData
  },
})
</script>

<template>
  <ADialog
    :loading="isLoading"
    height="80%"
    title="移库单明细"
    width="80%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="移库单"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          disabled
          field="storageName"
        />
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="移库明细">
        <ATable
          :column-list="getTableConfigList(MoveDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          :data-list="formData.details"
          :entity="MoveDetailEntity"
          hide-add
          hide-delete
          hide-edit
        >
          <template #storageName="{ data }">
            {{ data.inventory.storage.name }}({{ data.inventory.storage.code }})
          </template>
          <template #materialCode="{ data }">
            {{ data.inventory.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.inventory.material.name }}
          </template>
          <template #endRow="{ data }">
            <AButton
              :disabled="!MoveStatusEnum.MOVING.equalsKey(formData.status)"
              link
              @click="addDetailFinishQuantity(data, formData.id)"
            >
              作业
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
