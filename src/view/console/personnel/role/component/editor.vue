<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    confirm-text="保存"
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
      <AFormField field="name" />
      <AFormField field="code" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { AirValidator } from '@/airpower/helper/AirValidator'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  formRef, isLoading, formData, rules, title,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService, {
  customRules: {
    name: [
      AirValidator.show('不允许带管理员三个字').ifContain('管理员'),
    ],
  },
})
</script>

<style scoped lang="scss"></style>
