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
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父菜单"
      >
        {{ param.parent.name }}
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('path')"
        prop="path"
      >
        <AInput
          v-model.path="formData.path"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('component')"
        prop="component"
      >
        <AInput
          v-model.path="formData.component"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('orderNo')"
        prop="orderNo"
      >
        <AInput
          v-model.orderNo="formData.orderNo"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('icon')"
        prop="icon"
      >
        <AInput
          v-model.icon="formData.icon"
          :entity="MenuEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'

const props = defineProps(airPropsParam(new MenuEntity()))

const {
  title, formData, formRef, isLoading, rules,
  onSubmit,
} = useAirEditor(props, MenuEntity, MenuService)
</script>

<style scoped lang="scss"></style>
