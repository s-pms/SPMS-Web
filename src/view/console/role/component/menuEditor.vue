<template>
  <ADialog
    :title="RoleEntity.getClassName() + '菜单授权'"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    height="70%"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-tree
      ref="treeRef"
      check-strictly
      default-expand-all
      :data="treeList"
      show-checkbox
      node-key="id"
      :props="AirConfig.treeProps"
      @check="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { AirConfig } from '@/airpower/config/AirConfig'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { MenuService } from '@/model/menu/MenuService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { IJson } from '@/airpower/interface/IJson'
import { useAirEditor } from '@/airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading, formRef, formData,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService, {
  successMessage: '角色菜单授权成功',
})

const treeRef = ref<AirTreeInstance>()

async function onSelect(current: MenuEntity, more: IJson) {
  formData.value.menuList = more.checkedNodes
}

const treeList = ref([] as MenuEntity[])

async function getMenuTreeList() {
  treeList.value = await MenuService.create(isLoading).getList(new AirRequest(MenuEntity))
}

getMenuTreeList()

</script>

<style scoped lang="scss"></style>
