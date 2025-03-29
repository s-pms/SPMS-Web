<template>
  <ADialog
    :loading="isLoading"
    height="80%"
    title="出库单详情"
    width="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="出库单"
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
          <el-link @click="AirDialog.show(SaleDetail, formData.sale)">
            {{ formData.sale.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="OutputTypeEnum.MOVE.equalsKey(formData.type)"
          label="移库单号"
        >
          <el-link @click="AirDialog.show(MoveDetail, formData.move)">
            {{ formData.move.billCode }}
          </el-link>
        </el-form-item>
        <el-form-item
          v-if="OutputTypeEnum.PICKING.equalsKey(formData.type)"
          label="领料单号"
        >
          <el-link @click="AirDialog.show(PickingDetail, formData.picking)">
            {{ formData.picking.billCode }}
          </el-link>
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="出库明细">
        <ATable
          :data-list="formData.details"
          :entity="OutputDetailEntity"
          :field-list="
            OutputDetailEntity.getTableFieldConfigList().filter((item) => !['createTime'].includes(item.key))
          "
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
              :disabled="OutputStatusEnum.OUTPUTTING.notEqualsKey(formData.status)"
              icon-button
              tooltip="添加完成"
              type="CHECKIN"
              @click="
                data.billId = formData.id
                onAddFinish(data)
              "
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { AButton, ADialog, AFormField, AGroup, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { OutputAddFinishEditor } from '.'
import { MoveDetail } from '../../move/component'
import { SaleDetail } from '@/view/console/channel/sale/component'
import { OutputTypeEnum } from '@/model/wms/output/OutputTypeEnum'
import { OutputStatusEnum } from '@/model/wms/output/OutputStatusEnum'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { PickingDetail } from '@/view/console/mes/picking/component'

const props = defineProps(airPropsParam(new OutputEntity()))

const { formData, isLoading, getDetail } = useBillDetail(props, OutputEntity, OutputService, {
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
