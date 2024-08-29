<template>
  <ADialog
    :title="RoleEntity.getModelName() + '菜单授权'"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    height="70%"
    confirm-text="保存"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-tree
      ref="treeRef"
      check-strictly
      default-expand-all
      :data="treeList"
      show-checkbox
      node-key="id"
      :props="AirConfig.treeProps"
      :default-checked-keys="formData.menuList.map(item => item.id)"
      @check="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirRequest } from '@/airpower/model/AirRequest'
import { IJson } from '@/airpower/interface/IJson'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { MenuService } from '@/model/system/menu/MenuService'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading, formRef, formData,
} = useAirEditor(props, RoleEntity, RoleService, {
})

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

<style scoped lang="scss"></style>
