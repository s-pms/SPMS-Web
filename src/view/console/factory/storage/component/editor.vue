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
        v-if="formData.parent"
        label="所属上级"
      >
        {{ formData.parent.name }}({{ formData.parent.code }})
      </el-form-item>
      <el-form-item
        v-for="item in StorageEntity.getFormFieldConfigList()"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
      >
        <AInput
          v-model="(formData as IJson)[item.key]"
          :modifier="item.key"
          :entity="StorageEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { IJson } from '@/airpower/interface/IJson'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

const props = defineProps(airPropsParam(new StorageEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, StorageEntity, StorageService)

</script>
