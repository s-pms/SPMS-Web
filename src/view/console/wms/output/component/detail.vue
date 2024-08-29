<template>
  <ADialog
    title="出库单详情"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        title="出库单"
        :column="3"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          disabled
          field="type"
        />
        <el-form-item
          v-if="OutputTypeEnum.SALE.equalsKey(formData.type)"
          label="销售单号"
        >
          <el-link @click="AirDialog.show(SaleDetail,formData.sale)">
            {{ formData.sale.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="OutputTypeEnum.MOVE.equalsKey(formData.type)"
          label="移库单号"
        >
          <el-link @click="AirDialog.show(MoveDetail,formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="出库明细">
        <ATable
          :entity="OutputDetailEntity"
          :data-list="formData.details"
          :field-list="OutputDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #endRow="{ data }">
            <AButton
              icon-button
              tooltip="添加完成"
              :disabled=" OutputStatusEnum.OUTPUTTING.notEqualsKey(formData.status)"
              type="CHECKIN"
              @click="data.billId = formData.id; onAddFinish(data)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { OutputAddFinishEditor } from '.'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { MoveDetail } from '../../move/component'
import { SaleDetail } from '@/view/console/channel/sale/component'
import { OutputTypeEnum } from '@/model/wms/output/OutputTypeEnum'
import { OutputStatusEnum } from '@/model/wms/output/OutputStatusEnum'
import { BillFormCode, BillFormMoreDetail } from '@/component'

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
