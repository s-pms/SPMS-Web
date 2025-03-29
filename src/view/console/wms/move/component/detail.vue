<script lang="ts" setup>
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'
import { AButton, ADialog, AFormField, AGroup, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'

const props = defineProps(airPropsParam(new MoveEntity()))

const { formData, isLoading, addDetailFinishQuantity } = useBillDetail(props, MoveEntity, MoveService, {
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
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
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
          :data-list="formData.details"
          :entity="MoveDetailEntity"
          :field-list="MoveDetailEntity.getTableFieldConfigList().filter((item) => !['createTime'].includes(item.key))"
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
              :disabled="MoveStatusEnum.MOVING.notEqualsKey(formData.status)"
              icon-button
              tooltip="添加完成"
              type="CHECKIN"
              @click="
                data.billId = formData.id
                addDetailFinishQuantity(data)
              "
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
