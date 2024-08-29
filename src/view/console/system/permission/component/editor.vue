<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :fullable="false"
    :loading="isLoading"
    confirm-text="保存"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="PermissionService.createValidator(param)"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父权限"
      >
        {{ param.parent.name }}
      </el-form-item>
      <AFormField field="name" />
      <AFormField field="identity" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

const props = defineProps(airPropsParam(new PermissionEntity()))
const {
  isLoading, formData, formRef, title,
  onSubmit,
} = useAirEditor(props, PermissionEntity, PermissionService)
</script>

<style scoped lang="scss"></style>
