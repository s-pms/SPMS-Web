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
