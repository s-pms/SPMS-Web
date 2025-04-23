<script lang="ts" setup>
import { Constant } from '@/config/Constant'
import { ConfigEntity } from '@/model/system/config/ConfigEntity'
import { ConfigService } from '@/model/system/config/ConfigService'
import { ConfigType } from '@/model/system/config/ConfigType'

import { ADialog, AFormField, DialogProps, getFieldLabel, useEditor } from '@airpower/web'

const props = defineProps(DialogProps.withParam(new ConfigEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, ConfigService, {
  afterGetDetail: (data) => {
    switch (data.type) {
      case ConfigType.NUMBER.key:
        data.config = Number(data.config) as unknown as string
        break
      case ConfigType.BOOLEAN.key:
        data.config = (data.config === Constant.BOOLEAN_YES) as unknown as string
        break
      default:
    }
    return data
  },

  beforeSubmit: (data) => {
    switch (data.type) {
      case ConfigType.NUMBER.key:
        data.config = data.config.toString()
        break
      case ConfigType.BOOLEAN.key:
        data.config = data.config ? Constant.BOOLEAN_YES : Constant.BOOLEAN_NO
        break
      default:
    }
    return data
  },
})
</script>

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
      label-width="140px"
      @submit.prevent
    >
      <AFormField
        :disabled="formData.isSystem"
        field="flag"
      />
      <AFormField field="name" />
      <AFormField
        :disabled="formData.isSystem"
        field="type"
      />
      <template v-if="ConfigType.NUMBER.equalsKey(formData.type)">
        <el-form-item :label="getFieldLabel(ConfigEntity, 'config')">
          <el-input-number v-model="formData.config" />
        </el-form-item>
      </template>
      <template v-else-if="ConfigType.BOOLEAN.equalsKey(formData.type)">
        <el-form-item :label="getFieldLabel(ConfigEntity, 'config')">
          <el-switch v-model="formData.config" />
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item :label="getFieldLabel(ConfigEntity, 'config')">
          <el-input v-model="formData.config" />
        </el-form-item>
      </template>
      <el-form-item :label="getFieldLabel(ConfigEntity, 'description')">
        <el-input
          v-model="formData.description"
          disabled
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped>
.param-item {
  margin: 0 2px;
  cursor: pointer;
}
</style>
