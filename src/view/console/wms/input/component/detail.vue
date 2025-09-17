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

import { AButton, ADialog, AFormField, AGroup, ATable, DialogProps, DialogUtil, FeedbackUtil } from '@airpower/web'
import { InputAddFinishEditor } from '.'
import { MoveDetail } from '../../move/component'

const props = defineProps(DialogProps.withParam(new InputEntity()))

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
  await DialogUtil.show(InputAddFinishEditor, detail)
  FeedbackUtil.toastSuccess('明细入库成功')
  getDetail()
}
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @cancel="onCancel"
    @confirm="onConfirm"
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
          <el-link @click="DialogUtil.show(PurchaseDetail, formData.purchase)">
            {{ formData.purchase.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="InputTypeEnum.MOVE.equalsKey(formData.type)"
          label="移库单号"
        >
          <el-link @click="DialogUtil.show(MoveDetail, formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="InputTypeEnum.PRODUCTION.equalsKey(formData.type)"
          label="生产订单"
        >
          <el-link @click="DialogUtil.show(OrderDetail, formData.order)">
            {{ formData.order.billCode }}
          </el-link>
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="入库明细">
        <ATable
          :data-list="formData.details"
          :entity="InputDetailEntity"
          hide-add
          hide-delete
          hide-edit
        >
          <template #endRow="{ data }">
            <AButton
              :disabled="!InputStatusEnum.INPUTTING.equalsKey(formData.status)"
              link
              @click="onAddFinish(data)"
            >
              作业
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
