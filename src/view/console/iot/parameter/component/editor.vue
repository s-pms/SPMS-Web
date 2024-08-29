<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AFormField
        v-for="item in ParameterEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'

const props = defineProps(airPropsParam(new ParameterEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, ParameterEntity, ParameterService)

</script>
