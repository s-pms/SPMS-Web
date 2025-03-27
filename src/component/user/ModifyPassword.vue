<template>
  <div style="padding-top: 20px;">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <el-form-item label="原密码">
        <el-input
          v-model="formData.oldPassword"
          clearable
          placeholder="请输入原密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          v-model="formData.password"
          clearable
          placeholder="请输入新密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认下">
        <el-input
          v-model="confirmPassword"
          clearable
          placeholder="确认下密码"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="!formData.password || !formData.oldPassword || !confirmPassword"
          type="primary"
          @click="onSubmit"
        >
          确认修改密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { AirAlert } from '@airpower/feedback/AirAlert'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

const props = defineProps(airPropsParam(new UserEntity()))
const confirmPassword = ref('')
const {
  isLoading,
  formData,
  formRef,
  rules,
} = useAirEditor(props, UserEntity, UserService)

async function onSubmit() {
  if (confirmPassword.value !== formData.value.password) {
    AirNotification.error('两次密码不一致')
    return
  }
  await UserService.create(isLoading)
    .updateMyPassword(formData.value)
  await AirAlert.success('密码修改成功，请重新登录', '修改成功')
  window.location.replace('/login')
}
</script>

<style lang="scss" scoped>
.role-list > * {
  margin-right: 5px;
}
</style>
