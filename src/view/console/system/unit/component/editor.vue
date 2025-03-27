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
      <AFormField
        v-for="item in UnitEntity.getFormFieldConfigList()"
        :key="item.key"
        :field="item.key"
      />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'

const props = defineProps(airPropsParam(new UnitEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, UnitEntity, UnitService)

</script>
