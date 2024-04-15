<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
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
        <el-form-item
          :label="InputEntity.getFieldName('billCode')"
          prop="billCode"
        >
          <AInput
            v-model.billCode="formData.billCode"
            :entity="InputEntity"
          />
        </el-form-item>
        <el-form-item
          v-if="formData.type === InputType.PURCHASE"
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
          <template #materialCode="row">
            {{ (row.data as InputDetailEntity).material.code }}
          </template>
          <template #materialName="row">
            {{ (row.data as InputDetailEntity).material.name }}
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
          <template #customRow="row">
            <AButton
              v-if="isDetailEditable"
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(row.index)"
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
  AButton, ADialog, AGroup, AInput, ATable,
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
import { InputType } from '@/model/wms/input/InputType'

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

formData.value.type = formData.value.type ?? InputType.NORMAL

const isDetailEditable = computed(() => formData.value.type === InputType.NORMAL)

async function addDetail() {
  const detail: InputDetailEntity = await AirDialog.show(InputDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}

</script>
