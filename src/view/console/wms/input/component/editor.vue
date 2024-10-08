<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="入库单"
        :column="2"
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
          :entity="InputDetailEntity"
          :data-list="formData.details"
          :field-list="InputDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
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
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  AButton, ADialog, AFormField, AGroup, AInput, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { InputDetailEntity } from '@/model/wms/input/InputDetailEntity'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { InputTypeEnum } from '@/model/wms/input/InputTypeEnum'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, InputEntity, InputService, {
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
