<template>
  <ADialog
    title="移库单明细"
    :loading="isLoading"
    width="60%"
    height="70%"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      label-width="120px"
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
            disabled
          />
        </el-form-item>
        <el-form-item :label="MoveEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="MoveEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="来源存储资源"
          prop="fromStorageId"
        >
          <el-input
            v-model="formData.fromStorageName"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="目标存储资源"
          prop="toStorageId"
        >
          <el-input
            v-model="formData.toStorageName"
            disabled
          />
        </el-form-item>
        <el-form-item :label="MoveEntity.getFieldName('createTime')">
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item :label="MoveEntity.getFieldName('updateTime')">
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item
          v-if="formData.status === MoveStatus.REJECTED"
          style="width: 100%;"
          :label="MoveEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="MoveEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="入库明细">
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
          <template #endRow="row">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled="formData.status !== MoveStatus.MOVING"
              type="CHECKIN"
              @click="(row.data as MoveDetailEntity).billId = formData.id; onAddFinish(row.data)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AGroup, ATable, AInput, AButton, ADateTime,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { MoveStatus } from '@/model/wms/move/MoveStatus'

const props = defineProps(airPropsParam(new MoveEntity()))

const {
  formData, isLoading, onAddFinish,
} = useBillDetail(props, MoveEntity, MoveService, {
  afterGetDetail(detailData) {
    detailData.fromStorageName = detailData.fromStorage.name
    detailData.fromStorageCode = detailData.fromStorage.code
    detailData.fromStorageId = detailData.fromStorage.id
    detailData.toStorageName = detailData.toStorage.name
    detailData.toStorageCode = detailData.toStorage.code
    detailData.toStorageId = detailData.toStorage.id
    return detailData
  },
})

</script>
