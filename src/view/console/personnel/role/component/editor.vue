<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        :label="RoleEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="RoleEntity"
        />
      </el-form-item>
      <el-form-item
        :label="RoleEntity.getFormFieldLabel('remark')"
        prop="remark"
      >
        <AInput
          v-model.remark="formData.remark"
          :entity="RoleEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  formRef, isLoading, formData, rules, title,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService)
</script>

<style scoped lang="scss"></style>
