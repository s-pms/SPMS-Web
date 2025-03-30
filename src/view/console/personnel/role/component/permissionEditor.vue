<script lang="ts" setup>
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'
import { ADialog, ATable } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { AirRequest } from '@airpower/model/AirRequest'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new RoleEntity()))

const { isLoading, formRef, formData } = useAirEditor(props, RoleEntity, RoleService, {})

async function onSelect(selectList: PermissionEntity[]) {
  formData.value.permissionList = selectList
}

const treeList = ref<PermissionEntity[]>([])

async function getPermissionList() {
  treeList.value = await PermissionService.create(isLoading).getList(new AirRequest(PermissionEntity))
}

async function onSubmit() {
  await RoleService.create(isLoading).authorizePermission(formData.value.id, formData.value.permissionList)
  AirNotification.success('角色权限授权成功')
  props.onConfirm()
}

getPermissionList()
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="`${RoleEntity.getModelName()}权限授权`"
    confirm-text="保存"
    height="70%"
    width="70%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <ATable
      :data-list="treeList"
      :default-expand-all="false"
      :entity="PermissionEntity"
      :select-list="formData.permissionList"
      hide-ctrl
      hide-field-selector
      hide-index
      show-select
      @on-select="onSelect"
    />
  </ADialog>
</template>

<style lang="scss" scoped></style>
