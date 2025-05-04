<script lang="ts" setup>
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { BomTypeEnum } from '@/model/mes/bom/BomTypeEnum'
import { InputEntity } from '@/model/wms/input/InputEntity'

import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getFieldLabel,
  getTableConfigList,
  useEditor,
} from '@airpower/web'
import { BomDetailEditor } from '.'

const props = defineProps(DialogProps.withParam(new InputEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, BomService, {
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

formData.value.type = formData.value.type ?? BomTypeEnum.NORMAL.key

async function addDetail() {
  const detail: BomDetailEntity = await DialogUtil.show(BomDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的配方明细？')
  formData.value.details.splice(index, 1)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="70%"
    @cancel="onCancel"
    @confirm="onSubmit"
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
        <AFormField field="code" />
        <AFormField field="name" />
        <AFormField field="type" />
      </AGroup>
      <AGroup title="配方物料清单">
        <ATable
          :data-list="formData.details"
          :entity="BomDetailEntity"
          :column-list="getTableConfigList(BomDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          ctrl-width="80"
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
              icon="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(BomEntity, 'details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              danger
              link
              @click="deleteDetail(index)"
            >
              删除
            </AButton>
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>
