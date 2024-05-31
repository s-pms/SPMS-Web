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
      <AFormField field="appKey" />
      <AFormField field="appName" />
      <AFormField field="url" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { AppEntity } from '@/model/system/app/AppEntity'
import { AppService } from '@/model/system/app/AppService'

const props = defineProps(airPropsParam(new AppEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, AppEntity, AppService)

</script>
