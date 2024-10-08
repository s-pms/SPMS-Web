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
      </AGroup>
      <AGroup title="出库明细">
        <ATable
          :entity="OutputDetailEntity"
          :data-list="formData.details"
          :field-list="OutputDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #storageName="{ data }">
            {{
              data.inventory?.storage.name || "-"
            }}({{ data.inventory?.storage.code || "-" }})
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
              type="ADD"
              @click="addDetail()"
            >
              添加{{ OutputEntity.getFieldName('details') }}
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
  AButton, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { OutputDetailEntity } from '@/model/wms/output/OutputDetailEntity'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { OutputDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { OutputTypeEnum } from '@/model/wms/output/OutputTypeEnum'

const props = defineProps(airPropsParam(new OutputEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, OutputEntity, OutputService, {
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

formData.value.type = formData.value.type ?? OutputTypeEnum.NORMAL.key

const isDetailEditable = computed(() => OutputTypeEnum.NORMAL.equalsKey(formData.value.type))

async function addDetail() {
  const detail: OutputDetailEntity = await AirDialog.show(OutputDetailEditor)
  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的计划明细？')
  formData.value.details.splice(index, 1)
}

</script>
