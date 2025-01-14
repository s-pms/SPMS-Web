<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="70%"
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
        title="配方信息"
      >
        <AFormField field="billCode" />
        <AFormField field="name" />
        <AFormField field="type" />
      </AGroup>
      <AGroup title="配方物料清单">
        <ATable
          :ctrl-width="80"
          :data-list="formData.details"
          :entity="BomDetailEntity"
          :field-list="BomDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
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
              添加{{ BomEntity.getFieldName('details') }}
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
  AButton, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { BomDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomTypeEnum } from '@/model/mes/bom/BomTypeEnum'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, BomEntity, BomService, {
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

formData.value.type = formData.value.type ?? BomTypeEnum.NORMAL.key

async function addDetail() {
  const detail: BomDetailEntity = await AirDialog.show(BomDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的配方明细？')
  formData.value.details.splice(index, 1)
}

</script>
