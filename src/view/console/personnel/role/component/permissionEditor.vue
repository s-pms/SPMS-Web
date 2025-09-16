<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'
import { ADialog, ATable, DialogProps, FeedbackUtil, getModelName, QueryRequest, useEditor } from '@airpower/web'
import { ref } from 'vue'

const props = defineProps(DialogProps.withParam(new RoleEntity()))

const {
  isLoading,
  formRef,
  formData,
} = useEditor(props, RoleService, {})

async function onSelect(selectList: PermissionEntity[]) {
  formData.value.permissionList = selectList
}

const treeList = ref<PermissionEntity[]>([])

async function getPermissionList() {
  treeList.value = await PermissionService.create(isLoading).getList(new QueryRequest(PermissionEntity))
}

async function onSubmit() {
  await RoleService.create(isLoading).authorizePermission(formData.value.id, formData.value.permissionList)
  FeedbackUtil.toastSuccess('角色权限授权成功')
  props.onConfirm()
}

getPermissionList()
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="`${getModelName(RoleEntity)}权限授权`"
    confirm-text="保存"
    height="70%"
    hide-fullscreen
    width="70%"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <ATable
      :data-list="treeList"
      :default-expand-all="false"
      :entity="PermissionEntity"
      :select-list="formData.permissionList"
      hide-column-selector
      hide-ctrl
      hide-index
      show-select
      @selected="onSelect"
    />
  </ADialog>
</template>

<style lang="scss" scoped></style>
