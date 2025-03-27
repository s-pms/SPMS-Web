<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    width="1000px"
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
            type="ADD"
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

<script lang="ts" setup>
import {
  AButton, ADialog, AFormField, AGroup,
} from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { AirDialog } from '@airpower/helper/AirDialog'
import { StructureEntity } from '@/model/factory/structure/StructureEntity'
import { StructureService } from '@/model/factory/structure/StructureService'
import { OperationSelector } from '@/view/console/mes/operation/component'
import { DepartmentSelector } from '@/view/console/personnel/department/component'

const props = defineProps(airPropsParam(new StructureEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, StructureEntity, StructureService)

async function selectOperation() {
  formData.value.operationList = await AirDialog.selectList(OperationSelector, formData.value.operationList)
}

async function selectDepartment() {
  formData.value.departmentList = await AirDialog.selectList(DepartmentSelector, formData.value.departmentList)
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
