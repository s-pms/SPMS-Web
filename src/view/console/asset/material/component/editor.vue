<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
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
      <AFormField field="name" />
      <AFormField field="code" />
      <AFormField field="materialType" />
      <AFormField field="spc" />
      <el-form-item
        label="计量单位"
        prop="unitId"
      >
        <el-input
          :value="formData.unitInfo?.name || ''"
          clearable
          placeholder="请选择默认的计量单位"
          @clear="formData.exclude('unitInfo','unitId')"
          @click="selectUnit()"
        />
      </el-form-item>
      <AFormField field="purchasePrice" />
      <AFormField field="salePrice" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { UnitSelector } from '@/view/console/system/unit/component'

const props = defineProps(airPropsParam(new MaterialEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, MaterialEntity, MaterialService, {
  afterGetDetail(detailData) {
    detailData.unitId = detailData.unitInfo.id
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('unitId')
    return submitData
  },
})

async function selectUnit() {
  formData.value.unitInfo = await AirDialog.select(UnitSelector)
  formData.value.unitId = formData.value.unitInfo.id
}
</script>
