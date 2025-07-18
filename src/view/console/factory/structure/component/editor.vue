<script lang="ts" setup>
import { AButton, ADialog, AFormField, AGroup, DialogProps, DialogUtil, useEditor } from '@airpower/web'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'

import { OperationSelector } from '@/view/console/mes/operation/component'
import { DepartmentSelector } from '@/view/console/personnel/department/component'

const props = defineProps(DialogProps.withParam(new StructureEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, StructureService)

async function selectOperation() {
  formData.value.operationList = await DialogUtil.selectList(OperationSelector, formData.value.operationList)
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
    width="1000px"
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
      <AGroup :column="2">
        <AFormField field="name" />
        <AFormField field="type" />
        <AFormField field="code" />
        <el-form-item
          v-if="formData.parent"
          label="所属上级"
        >
          {{ formData.parent.name }}({{ formData.parent.code }})
        </el-form-item>
      </AGroup>
      <AGroup title="可执行工序">
        <div class="list">
          <AButton
            icon="ADD"
            @click="selectOperation()"
          >
            添加工序
          </AButton>
          <el-tag
            v-for="(operation, index) in formData.operationList"
            :key="operation.id"
            closable
            size="large"
            @close="formData.operationList.splice(index, 1)"
          >
            {{ operation.name }}
          </el-tag>
        </div>
      </AGroup>
      <AGroup title="所属部门">
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
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
