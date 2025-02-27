<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
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
      <AFormField field="name" />
      <AFormField field="code" />
      <AFormField field="materialType" />
      <AFormField field="useType" />
      <AFormField field="spc" />
      <el-form-item
        label="计量单位"
        prop="unit"
      >
        <ASelect
          v-model="formData.unit"
          :selector="UnitSelector"
        />
      </el-form-item>
      <AFormField field="purchasePrice" />
      <AFormField field="salePrice" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
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
    return detailData
  },
  beforeSubmit(submitData) {
    return submitData
  },
})

</script>
