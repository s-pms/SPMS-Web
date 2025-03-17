<template>
  <ADialog
    title="移库单明细"
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
        title="移库单"
        :column="3"
      >
        <BillFormCode :bill="formData" />
        <AFormField
          field="storageName"
          disabled
        />
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="移库明细">
        <ATable
          :entity="MoveDetailEntity"
          :data-list="formData.details"
          :field-list="
            MoveDetailEntity.getTableFieldConfigList().filter(
              (item) => !['createTime'].includes(item.key)
            )
          "
          hide-edit
          hide-delete
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
              icon-button
              tooltip="添加完成"
              :disabled="MoveStatusEnum.MOVING.notEqualsKey(formData.status)"
              type="CHECKIN"
              @click="
                data.billId = formData.id;
                addDetailFinishQuantity(data);
              "
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
  ADialog,
  AFormField,
  AGroup,
  ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'
import { BillFormCode, BillFormMoreDetail } from '@/component'

const props = defineProps(airPropsParam(new MoveEntity()))

const { formData, isLoading, addDetailFinishQuantity } = useBillDetail(
  props,
  MoveEntity,
  MoveService,
  {
    afterGetDetail(detailData) {
      detailData.storageName = detailData.storage.name
      return detailData
    },
  },
)
</script>
