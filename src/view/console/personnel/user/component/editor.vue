<script lang="ts" setup>
import { AButton, ADialog, AGroup, AInput, DialogProps, DialogUtil, getFieldLabel, useEditor } from '@airpower/web'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { DepartmentSelector } from '@/view/console/personnel/department/component'
import { RoleSelector } from '../../role/component'

const props = defineProps(DialogProps.withParam(new UserEntity()))

const {
  isLoading,
  formData,
  formRef,
  title,
  rules,
  onSubmit,
} = useEditor(props, UserService, {
  beforeSubmit: (submitData) => {
    submitData.departmentList = submitData.departmentList.map(item => item.copyOnlyId())
    submitData.roleList = submitData.roleList.map(item => item.copyOnlyId())
    return submitData
  },
})

async function selectRole() {
  formData.value.roleList = await DialogUtil.selectList(RoleSelector, formData.value.roleList)
}

async function selectDepartment() {
  formData.value.departmentList = await DialogUtil.selectList(DepartmentSelector, formData.value.departmentList)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    height="60%"
    hide-fullscreen
    width="60%"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="基础信息"
      >
        <el-form-item
          :label="getFieldLabel(UserEntity, 'nickname')"
          prop="nickname"
        >
          <AInput
            v-model.nickname="formData.nickname"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="getFieldLabel(UserEntity, 'email')"
          prop="email"
        >
          <AInput
            v-model.email="formData.email"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="getFieldLabel(UserEntity, 'phone')"
          prop="phone"
        >
          <AInput
            v-model.phone="formData.phone"
            :entity="UserEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        :column="1"
        title="角色"
      >
        <div class="list">
          <AButton
            icon="ADD"
            @click="selectRole()"
          >
            添加角色
          </AButton>
          <el-tag
            v-for="(role, index) in formData.roleList"
            :key="role.id"
            closable
            size="large"
            @close="formData.roleList.splice(index, 1)"
          >
            {{ role.name }}
          </el-tag>
        </div>
      </AGroup>
      <AGroup
        :column="1"
        title="部门"
      >
        <div class="list">
          <AButton
            icon="ADD"
            @click="selectDepartment()"
          >
            添加部门
          </AButton>
          <el-tag
            v-for="(department, index) in formData.departmentList"
            :key="department.id"
            closable
            size="large"
            @close="formData.departmentList.splice(index, 1)"
          >
            {{ department.name }}
          </el-tag>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped>
.list > * {
  margin-right: 5px;
}
</style>
