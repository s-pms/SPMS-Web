<script lang="ts" setup>
import { RoomEntity } from '@/model/chat/room/RoomEntity'
import { RoomService } from '@/model/chat/room/RoomService'
import { ADialog, AInput } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new RoomEntity()))

const { isLoading, formData, formRef, rules } = useAirEditor(props, RoomEntity, RoomService)

formData.value.name = '测试房间'

async function onSubmit() {
  await formRef.value?.validate()
  await RoomService.create(isLoading).createRoom(formData.value)
  props.onConfirm()
}
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    confirm-text="确认创建"
    title="创建房间"
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
      <el-form-item
        :label="RoomEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="RoomEntity"
        />
      </el-form-item>
      <el-form-item
        :label="RoomEntity.getFormFieldLabel('isPrivate')"
        prop="isPrivate"
      >
        <AInput
          v-model.isPrivate="formData.isPrivate"
          :entity="RoomEntity"
        />
      </el-form-item>
      <el-form-item
        v-if="formData.isPrivate"
        :label="RoomEntity.getFormFieldLabel('password')"
        prop="password"
      >
        <AInput
          v-model.password="formData.password"
          :entity="RoomEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped></style>
