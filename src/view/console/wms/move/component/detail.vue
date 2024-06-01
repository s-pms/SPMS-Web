<template>
  <ADialog
    title="移库单明细"
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
        title="移库单"
        :column="2"
      >
        <AFormField
          field="billCode"
          disabled
        />
        <AFormField
          field="storageName"
          disabled
        />
        <AFormField field="createTime">
          <ADateTime :time="formData.createTime" />
        </AFormField>
        <AFormField field="updateTime">
          <ADateTime :time="formData.updateTime" />
        </AFormField>
        <AFormField
          disabled
          field="status"
        />
        <AFormField
          v-if="MoveStatusEnum.REJECTED.equalsKey(formData.status)"
          style="width: 100%"
          field="rejectReason"
          disabled
        />
      </AGroup>
      <AGroup title="移库明细">
        <ATable
          :entity="MoveDetailEntity"
          :data-list="formData.details"
          :field-list="MoveDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #storageName="row">
            {{
              (row.data as MoveDetailEntity).inventory.storage.name
            }}({{ (row.data as MoveDetailEntity).inventory.storage.code }})
          </template>
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
              :disabled="MoveStatusEnum.MOVING.notEqualsKey(formData.status)"
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
  AButton, ADateTime, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MoveDetailEntity } from '@/model/wms/move/MoveDetailEntity'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'

const props = defineProps(airPropsParam(new MoveEntity()))

const {
  formData, isLoading, onAddFinish,
} = useBillDetail(props, MoveEntity, MoveService, {
  afterGetDetail(detailData) {
    detailData.storageName = detailData.storage.name
    detailData.storageId = detailData.storage.id
    return detailData
  },
})

</script>
