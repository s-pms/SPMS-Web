<script lang="ts" setup>
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { DepartmentSelector } from '@/view/console/personnel/department/component'
import { AButton, ADialog, AGroup, AInput } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { RoleSelector } from '../../role/component'

const props = defineProps(airPropsParam(new UserEntity()))

const { isLoading, formData, formRef, title, rules, onSubmit } = useAirEditor(props, UserEntity, UserService)

async function selectRole() {
  formData.value.roleList = await AirDialog.selectList(RoleSelector, formData.value.roleList)
}

async function selectDepartment() {
  formData.value.departmentList = await AirDialog.selectList(DepartmentSelector, formData.value.departmentList)
}
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    height="60%"
    width="60%"
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
      <AGroup
        :column="2"
        title="基础信息"
      >
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
          :label="UserEntity.getFormFieldLabel('email')"
          prop="email"
        >
          <AInput
            v-model.email="formData.email"
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
        :column="2"
        title="角色和部门"
      >
        <div class="role-list">
          <AButton
            type="ADD"
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
        <div class="department-list">
          <AButton
            type="ADD"
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
.role-list > *,
.department-list > * {
  margin-right: 5px;
}
</style>
