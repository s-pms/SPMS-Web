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
      <el-form-item
        v-if="param.parent"
        label="父菜单"
      >
        {{ param.parent.name }}
      </el-form-item>
      <AFormField field="name" />
      <AFormField field="path" />
      <AFormField field="component" />
      <AFormField field="orderNo" />
      <AFormField field="icon" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

const props = defineProps(airPropsParam(new MenuEntity()))

const {
  title,
  formData,
  formRef,
  isLoading,
  rules,
  onSubmit,
} = useAirEditor(props, MenuEntity, MenuService)
</script>

<style lang="scss" scoped></style>
