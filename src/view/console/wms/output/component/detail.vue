<template>
  <ADialog
    title="出库单详情"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <el-form
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="出库单"
        :column="2"
      >
        <el-form-item
          :label="OutputEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="OutputEntity.getFieldName('type')"
          prop="type"
        >
          <AInput
            v-model.type="formData.type"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item :label="OutputEntity.getFieldName('createTime')">
          <ADateTime :time="formData.createTime" />
        </el-form-item>
        <el-form-item :label="OutputEntity.getFieldName('updateTime')">
          <ADateTime :time="formData.updateTime" />
        </el-form-item>
        <el-form-item :label="OutputEntity.getFieldName('status')">
          <AInput
            v-model.status="formData.status"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.type===OutputType.SALE"
          label="销售单号"
        >
          <AInput
            v-model.status="formData.sale.billCode"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.type===OutputType.MOVE"
          label="移库单号"
        >
          <AInput
            v-model.status="formData.move.billCode"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="formData.status === OutputStatus.REJECTED"
          style="width: 100%;"
          :label="OutputEntity.getFieldName('rejectReason')"
        >
          <AInput
            v-model.rejectReason="formData.rejectReason"
            :entity="OutputEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="出库明细">
        <ATable
          :entity="OutputDetailEntity"
          :data-list="formData.details"
          :field-list="OutputDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #storageCode="row">
            {{ (row.data as OutputDetailEntity).inventory?.storage.code || "-" }}
          </template>
          <template #storageName="row">
            {{ (row.data as OutputDetailEntity).inventory?.storage.name || "-" }}
          </template>
          <template #materialCode="row">
            {{ (row.data as OutputDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as OutputDetailEntity).material.name }}
          </template>
          <template #endRow="row">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled="formData.status !== OutputStatus.OUTPUTTING"
              type="CHECKIN"
              @click="(row.data as OutputDetailEntity).billId = formData.id; onAddFinish(row.data)"
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
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { OutputStatus } from '@/model/wms/output/OutputStatus'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { OutputAddFinishEditor } from '.'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { OutputType } from '@/model/wms/output/OutputType'

const props = defineProps(airPropsParam(new OutputEntity()))

const {
  formData, isLoading, getDetail,
} = useBillDetail(props, OutputEntity, OutputService, {
  afterGetDetail(detailData) {
    return detailData
  },
})

async function onAddFinish(detail: OutputDetailEntity) {
  await AirDialog.show(OutputAddFinishEditor, detail)
  AirNotification.success('明细出库成功')
  getDetail()
}

</script>
