<template>
  <ADialog
    :title="title"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="入库单"
        :column="2"
      >
        <el-form-item :label="InputEntity.getFieldName('billCode')">
          <AInput
            v-model.billCode="formData.billCode"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="InputEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="InputEntity.getFieldName('createTime')">
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item :label="InputEntity.getFieldName('updateTime')">
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item :label="InputEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.type===InputType.PURCHASE"
          label="采购单号"
        >
          <el-link @click="AirDialog.show(PurchaseDetail,formData.purchase)">
            {{ formData.purchase.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="formData.type===InputType.MOVE"
          label="移库单号"
        >
          <el-link @click="AirDialog.show(MoveDetail,formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="formData.status === InputStatus.REJECTED"
          style="width: 100%;"
          :label="InputEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="入库明细">
        <ATable
          :entity="InputDetailEntity"
          :data-list="formData.details"
          :field-list="InputDetailEntity.getTableFieldConfigList()"
          hide-delete
          hide-edit
        >
          <template #storageName="row">
            {{ (row.data as InputDetailEntity).storage?.name || "-" }}({{ (row.data as InputDetailEntity).storage?.code || "-" }})
          </template>
          <template #materialCode="row">
            {{ (row.data as InputDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as InputDetailEntity).material.name }}
          </template>
          <template #endRow="row">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled="formData.status !== InputStatus.INPUTTING"
              type="CHECKIN"
              @click="onAddFinish(row.data)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton,
  ADateTime,
  ADialog, AGroup, AInput, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputStatus } from '@/model/wms/input/InputStatus'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { InputType } from '@/model/wms/input/InputType'
import { InputAddFinishEditor } from '.'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MoveDetail } from '../../move/component'
import { PurchaseDetail } from '@/view/console/channel/purchase/component'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title, formData, isLoading,
  getDetail,
} = useBillDetail(props, InputEntity, InputService, {
  afterGetDetail(detailData) {
    return detailData
  },
})

async function onAddFinish(detail: InputDetailEntity) {
  await AirDialog.show(InputAddFinishEditor, detail)
  AirNotification.success('明细入库成功')
  getDetail()
}
</script>
