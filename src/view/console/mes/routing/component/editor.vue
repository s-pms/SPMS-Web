<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
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

      <el-form-item
        label="关联物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :selector="MaterialSelector"
          placeholder="请选择工艺关联物料"
        />
      </el-form-item>
      <el-form-item
        label="关联配方"
        prop="bom"
      >
        <ASelect
          v-model="formData.bom"
          :selector="BomSelector"
          placeholder="请选择工艺关联配方"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { BomSelector } from '@/view/console/mes/bom/component'

const props = defineProps(airPropsParam(new RoutingEntity()))

const {
  formRef,
  isLoading,
  formData,
  rules,
  title,
  onSubmit,
} = useAirEditor(props, RoutingEntity, RoutingService)
</script>

<style lang="scss" scoped></style>
