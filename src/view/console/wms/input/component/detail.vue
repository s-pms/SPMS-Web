<script lang="ts" setup>
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputStatusEnum } from '@/model/wms/input/InputStatusEnum'
import { InputTypeEnum } from '@/model/wms/input/InputTypeEnum'
import { PurchaseDetail } from '@/view/console/channel/purchase/component'
import { OrderDetail } from '@/view/console/mes/order/component'
import { AButton, ADialog, AFormField, AGroup, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirDialog } from '@airpower/helper/AirDialog'
import { InputAddFinishEditor } from '.'
import { MoveDetail } from '../../move/component'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title,
  formData,
  isLoading,
  getDetail,
} = useBillDetail(props, InputService, {
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

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="入库单"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          disabled
          field="type"
        />
        <el-form-item
          v-if="InputTypeEnum.PURCHASE.equalsKey(formData.type)"
          label="采购单号"
        >
          <el-link @click="AirDialog.show(PurchaseDetail, formData.purchase)">
            {{ formData.purchase.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="InputTypeEnum.MOVE.equalsKey(formData.type)"
          label="移库单号"
        >
          <el-link @click="AirDialog.show(MoveDetail, formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="InputTypeEnum.PRODUCTION.equalsKey(formData.type)"
          label="生产订单"
        >
          <el-link @click="AirDialog.show(OrderDetail, formData.order)">
            {{ formData.order.billCode }}
          </el-link>
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="入库明细">
        <ATable
          :data-list="formData.details"
          :entity="InputDetailEntity"
          :field-list="InputDetailEntity.getTableFieldConfigList()"
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #endRow="{ data }">
            <AButton
              :disabled="InputStatusEnum.INPUTTING.notEqualsKey(formData.status)"
              icon-button
              tooltip="添加完成"
              type="CHECKIN"
              @click="onAddFinish(data)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
