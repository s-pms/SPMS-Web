<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title + PickingEntity.getModelName()"
    height="80%"
    width="80%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="领料单"
      >
        <AFormField field="billCode" />
        <el-form-item
          :label="PickingEntity.getFieldName('structure')"
          prop="structure"
        >
          <ASelect
            v-model="formData.structure"
            :selector="StructureSelector"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="申领明细">
        <ATable
          :data-list="formData.details"
          :entity="PickingDetailEntity"
          :field-list="PickingDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ PickingEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              icon-button
              type="DELETE"
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AFormField, AGroup, ASelect, ATable,
} from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { PickingDetailEditor } from '.'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { StructureSelector } from '@/view/console/factory/structure/component'

const props = defineProps(airPropsParam(new PickingEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, PickingEntity, PickingService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      AirNotification.warning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const detail: PickingDetailEntity = await AirDialog.show(PickingDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的申领明细？')
  formData.value.details.splice(index, 1)
}
</script>
