<template>
  <ATreeBox
    :tree-data="departmentList"
    searchable
    @change="departmentChanged"
  >
    <APanel>
      <AToolBar
        :entity="UserEntity"
        :loading="isLoading"
        :service="UserService"
        @on-add="onAdd"
        @on-search="onSearch"
      />
      <ATable
        v-loading="isLoading"
        :ctrl-width="150"
        :data-list="response.list"
        :entity="UserEntity"
        show-enable-and-disable
        @on-edit="onEdit"
        @on-delete="onDelete"
        @on-enable="onEnable"
        @on-disable="onDisable"
      />
      <template #footerLeft>
        <APage
          :response="response"
          @on-change="onPageChanged"
        />
      </template>
    </APanel>
  </ATreeBox>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import {
  APage, APanel, ATable, AToolBar, ATreeBox,
} from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { AirRequest } from '@airpower/model/AirRequest'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { UserEditor } from './component'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'

const {
  isLoading,
  response,
  request,
  onPageChanged,
  onDelete,
  onEdit,
  onAdd,
  onSearch,
  onEnable,
  onDisable,
  onGetList,
} = useAirTable(UserEntity, UserService, {
  editView: UserEditor,
})

const departmentList: Ref<DepartmentEntity[]> = ref([])

const isLoadingTree = ref(false)

function departmentChanged(department?: DepartmentEntity) {
  request.value.filter.departmentId = department?.id || undefined
  onGetList()
}

async function getDepartmentList() {
  departmentList.value = await DepartmentService.create(isLoadingTree)
    .getList(new AirRequest(DepartmentEntity))
}

getDepartmentList()
</script>
<style lang="scss" scoped></style>
