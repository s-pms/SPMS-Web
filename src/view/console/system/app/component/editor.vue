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
      <el-form-item
        :label="AppEntity.getFormFieldLabel('appKey')"
        prop="appKey"
      >
        <AInput
          v-model.appKey="formData.appKey"
          :entity="AppEntity"
        />
      </el-form-item>
      <el-form-item
        :label="AppEntity.getFormFieldLabel('appName')"
        prop="appName"
      >
        <AInput
          v-model.appName="formData.appName"
          :entity="AppEntity"
        />
      </el-form-item>
      <el-form-item
        :label="AppEntity.getFormFieldLabel('url')"
        prop="url"
      >
        <AInput
          v-model.url="formData.url"
          :entity="AppEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
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
