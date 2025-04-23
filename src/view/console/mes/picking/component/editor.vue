<script lang="ts" setup>
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'
import { StructureSelector } from '@/view/console/factory/structure/component'

import { AButton, ADialog, AFormField, AGroup, ASelect, ATable, DialogProps, DialogUtil, FeedbackUtil, getFieldLabel, getModelName, getTableConfigList, useEditor } from '@airpower/web'
import { PickingDetailEditor } from '.'

const props = defineProps(DialogProps.withParam(new PickingEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, PickingService, {
  afterGetDetail(detailData) {
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      FeedbackUtil.toastWarning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const detail: PickingDetailEntity = await DialogUtil.show(PickingDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的申领明细？')
  formData.value.details.splice(index, 1)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title + getModelName(PickingEntity)"
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
          :label="getFieldLabel(PickingEntity, 'structure')"
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
          :field-list="
            getTableConfigList(PickingDetailEntity).filter((item) => !['createTime'].includes(item.key))
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
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(PickingEntity, 'details') }}
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
