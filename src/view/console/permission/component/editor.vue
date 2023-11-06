<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :fullable="false"
    :loading="isLoading"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
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
      <el-form-item
        :label="PermissionEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="PermissionEntity"
        />
      </el-form-item>
      <el-form-item
        :label="PermissionEntity.getFormFieldLabel('identity')"
        prop="identity"
      >
        <AInput
          v-model.identity="formData.identity"
          :entity="PermissionEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { PermissionService } from '@/model/permission/PermissionService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { useAirEditor } from '@/airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new PermissionEntity()))
const {
  isLoading, formData, formRef, title,
  onSubmit,
} = useAirEditor(props, PermissionEntity, PermissionService)
</script>

<style scoped lang="scss"></style>
