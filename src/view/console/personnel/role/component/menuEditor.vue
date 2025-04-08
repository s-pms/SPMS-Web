<script lang="ts" setup>
import type { IJson } from '@airpower/interface/IJson'
import type { AirTreeInstance } from '@airpower/type/AirType'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'
import { ADialog } from '@airpower/component'
import { AirConfig } from '@airpower/config/AirConfig'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { AirRequest } from '@airpower/model/AirRequest'
import { ref } from 'vue'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading,
  formRef,
  formData,
} = useAirEditor(props, RoleService, {})

const treeRef = ref<AirTreeInstance>()

async function onSelect(current: MenuEntity, more: IJson) {
  formData.value.menuList = more.checkedNodes
}

const treeList = ref<MenuEntity[]>([])

async function getMenuTreeList() {
  treeList.value = await MenuService.create(isLoading).getList(new AirRequest(MenuEntity))
}

async function onSubmit() {
  await RoleService.create(isLoading).authorizeMenu(formData.value.id, formData.value.menuList)
  AirNotification.success('授权菜单成功')
  props.onConfirm()
}

getMenuTreeList()
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="`${RoleEntity.getModelName()}菜单授权`"
    confirm-text="保存"
    height="70%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-tree
      ref="treeRef"
      :data="treeList"
      :default-checked-keys="formData.menuList.map((item) => item.id)"
      :props="AirConfig.treeProps"
      check-strictly
      default-expand-all
      node-key="id"
      show-checkbox
      @check="onSelect"
    />
  </ADialog>
</template>

<style lang="scss" scoped></style>
