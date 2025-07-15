<script lang="ts" setup>
import {OutputDetailEntity} from '@/model/wms/output/OutputDetailEntity'
import {OutputEntity} from '@/model/wms/output/OutputEntity'

import {OutputService} from '@/model/wms/output/OutputService'
import {OutputTypeEnum} from '@/model/wms/output/OutputTypeEnum'
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
import {computed} from 'vue'
import {OutputDetailEditor} from '.'

const props = defineProps(DialogProps.withParam(new OutputEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, OutputService, {
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

formData.value.type = formData.value.type ?? OutputTypeEnum.NORMAL.key

const isDetailEditable = computed(() => OutputTypeEnum.NORMAL.equalsKey(formData.value.type))

async function addDetail() {
  const detail: OutputDetailEntity = await DialogUtil.show(OutputDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await FeedbackUtil.confirmWarning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
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
        title="入库单"
      >
        <AFormField field="billCode" />
      </AGroup>
      <AGroup title="出库明细">
        <ATable
          :data-list="formData.details"
          :entity="OutputDetailEntity"
          :column-list="
            getTableConfigList(OutputDetailEntity).filter((item) => !['createTime'].includes(item.key))
          "
          hide-delete
          hide-edit
        >
          <template #storageName="{ data }">
            {{ data.inventory?.storage.name || '-' }}({{ data.inventory?.storage.code || '-' }})
          </template>
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #addButton>
            <AButton
              v-if="isDetailEditable"
              icon="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(OutputEntity, 'details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              v-if="isDetailEditable"
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
