<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    confirm-text="保存"
    width="60%"
    height="60%"
    :fullable="false"
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
      <AGroup
        :column="2"
        title="基础信息"
      >
        <el-form-item
          :label="UserEntity.getFormFieldLabel('account')"
          prop="account"
        >
          <AInput
            v-model.account="formData.account"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="UserEntity.getFormFieldLabel('email')"
          prop="email"
        >
          <AInput
            v-model.email="formData.email"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="UserEntity.getFormFieldLabel('nickname')"
          prop="nickname"
        >
          <AInput
            v-model.nickname="formData.nickname"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="UserEntity.getFormFieldLabel('phone')"
          prop="phone"
        >
          <AInput
            v-model.phone="formData.phone"
            :entity="UserEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        title="用户角色"
        :column="2"
      >
        <div class="role-list">
          <AButton
            type="ADD"
            @click="selectRole()"
          >
            选择
          </AButton>
          <el-tag
            v-for="(role, index) in formData.roleList"
            :key="role.id"
            size="large"
            closable
            @close="formData.roleList.splice(index, 1)"
          >
            {{ role.name }}
          </el-tag>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AGroup, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleSelector } from '../../role/component'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

const props = defineProps(airPropsParam(new UserEntity()))

const {
  isLoading, formData, formRef, title, rules,
  onSubmit,
} = useAirEditor(props, UserEntity, UserService)

async function selectRole() {
  formData.value.roleList = await AirDialog.selectList(RoleSelector, formData.value.roleList)
}
</script>

<style scoped lang="scss">
.role-list>* {

  margin-right: 5px;
}
</style>
