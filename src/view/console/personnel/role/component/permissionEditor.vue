<template>
  <ADialog
    :title="RoleEntity.getModelName() + '权限授权'"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    height="70%"
    width="70%"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <ATable
      :select-list="formData.permissionList"
      :entity="PermissionEntity"
      :data-list="treeList"
      hide-index
      show-select
      :default-expand-all="false"
      hide-ctrl
      hide-field-selector
      @on-select="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, ATable } from '@/airpower/component'
import { AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirRequest } from '@/airpower/model/AirRequest'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { PermissionService } from '@/model/system/permission/PermissionService'

const treeRef = ref<AirTreeInstance>()

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading, formRef, formData,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService, {
  afterGetDetail() {
    treeRef.value?.setCheckedKeys(formData.value.permissionList.map((item) => item.id))
  },
  successMessage: '角色权限授权成功',
})

async function onSelect(selectList: PermissionEntity[]) {
  formData.value.permissionList = selectList
}

const treeList = ref([] as PermissionEntity[])

async function getPermissionList() {
  treeList.value = await PermissionService.create(isLoading).getList(new AirRequest(PermissionEntity))
}

getPermissionList()

</script>

<style scoped lang="scss"></style>
