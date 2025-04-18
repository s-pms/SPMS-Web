<script lang="ts" setup>
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputTypeEnum } from '@/model/wms/input/InputTypeEnum'
import { AButton, ADialog, AFormField, AGroup, AInput, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirConfirm } from '@airpower/feedback/AirConfirm'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { computed } from 'vue'
import { InputDetailEditor } from '.'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, InputService, {
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

formData.value.type = formData.value.type ?? InputTypeEnum.NORMAL.key

const isDetailEditable = computed(() => InputTypeEnum.NORMAL.equalsKey(formData.value.type))

async function addDetail() {
  const detail: InputDetailEntity = await AirDialog.show(InputDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
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
          :data-list="formData.details"
          :entity="InputDetailEntity"
          :field-list="InputDetailEntity.getTableFieldConfigList().filter((item) => !['createTime'].includes(item.key))"
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
              v-if="isDetailEditable"
              type="ADD"
              @click="addDetail()"
            >
              添加{{ InputEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              v-if="isDetailEditable"
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
