<script lang="ts" setup>
import {BillFormCode, BillFormMoreDetail} from '@/component'
import {useBillDetail} from '@/hook/billTable/useBillDetail'
import {OutputDetailEntity} from '@/model/wms/output/OutputDetailEntity'
import {OutputEntity} from '@/model/wms/output/OutputEntity'
import {OutputService} from '@/model/wms/output/OutputService'
import {OutputStatusEnum} from '@/model/wms/output/OutputStatusEnum'
import {OutputTypeEnum} from '@/model/wms/output/OutputTypeEnum'

import {SaleDetail} from '@/view/console/channel/sale/component'
import {PickingDetail} from '@/view/console/mes/picking/component'
import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getTableConfigList,
} from '@airpower/web'
import {OutputAddFinishEditor} from '.'
import {MoveDetail} from '../../move/component'

const props = defineProps(DialogProps.withParam(new OutputEntity()))

const {
  formData,
  isLoading,
  getDetail,
} = useBillDetail(props, OutputService, {
  afterGetDetail(detailData) {
    return detailData
  },
})

async function onAddFinish(detail: OutputDetailEntity, billId: number) {
  detail.billId = billId
  await DialogUtil.show(OutputAddFinishEditor, detail)
  FeedbackUtil.toastSuccess('明细出库成功')
  getDetail()
}
</script>

<template>
  <ADialog
      :loading="isLoading"
      height="80%"
      title="出库单详情"
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
          title="出库单"
      >
        <BillFormCode :bill="formData"/>
        <AFormField
            disabled
            field="type"
        />
        <el-form-item
            v-if="OutputTypeEnum.SALE.equalsKey(formData.type)"
            label="销售单号"
        >
          <el-link @click="DialogUtil.show(SaleDetail, formData.sale)">
            {{ formData.sale.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
            v-if="OutputTypeEnum.MOVE.equalsKey(formData.type)"
            label="移库单号"
        >
          <el-link @click="DialogUtil.show(MoveDetail, formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
            v-if="OutputTypeEnum.PICKING.equalsKey(formData.type)"
            label="领料单号"
        >
          <el-link @click="DialogUtil.show(PickingDetail, formData.picking)">
            {{ formData.picking.billCode }}
          </el-link>
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData"/>
      <AGroup title="出库明细">
        <ATable
            :column-list="getTableConfigList(OutputDetailEntity).filter(
            (item) => !['createTime'].includes(item.key),
          )
          "
            :data-list="formData.details"
            :entity="OutputDetailEntity"
            hide-add
            hide-delete
            hide-edit
        >
          <template #endRow="{ data }">
            <AButton
                :disabled="!OutputStatusEnum.OUTPUTTING.equalsKey(formData.status)
              "
                link
                @click="onAddFinish(data, formData.id)"
            >
              作业
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
