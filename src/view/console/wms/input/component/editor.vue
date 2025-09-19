<script lang="ts" setup>
import {
  AButton,
  ADialog,
  AFormField,
  AGroup,
  AInput,
  ATable,
  DialogProps,
  DialogUtil,
  FeedbackUtil,
  getFieldLabel,
  getTableConfigList,
  useEditor,
} from '@airpower/web'
import { computed } from 'vue'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputTypeEnum } from '@/model/wms/input/InputTypeEnum'
import { InputDetailEditor } from '.'

const props = defineProps(DialogProps.withParam(new InputEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, InputService, {
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

formData.value.type = formData.value.type ?? InputTypeEnum.NORMAL.key

const isDetailEditable = computed(() => InputTypeEnum.NORMAL.equalsKey(formData.value.type))

async function addDetail() {
  const detail: InputDetailEntity = await DialogUtil.show(InputDetailEditor)
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
        <el-form-item
          v-if="InputTypeEnum.PURCHASE.equalsKey(formData.type)"
          label="采购单号"
        >
          <AInput
            v-model.status="formData.purchase.billCode"
            :entity="InputEntity"
            disabled
          />
        </el-form-item>
      </AGroup>
      <AGroup title="入库明细">
        <ATable
          :column-list="getTableConfigList(InputDetailEntity).filter((item) => !['createTime'].includes(item.key))"
          :data-list="formData.details"
          :entity="InputDetailEntity"
          hide-add
          hide-delete
          hide-edit
        >
          <template #addButton>
            <AButton
              v-if="isDetailEditable"
              icon="ADD"
              @click="addDetail()"
            >
              添加{{ getFieldLabel(InputEntity, 'details') }}
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
