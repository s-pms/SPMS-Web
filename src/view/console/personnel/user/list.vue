<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

import { APage, APanel, ATable, ATreeBox, QueryRequest } from '@airpower/web'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { UserEditor } from './component'

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
} = useMyTable(UserService, {
  editView: UserEditor,
})

const departmentList: Ref<DepartmentEntity[]> = ref([])

const isLoadingTree = ref(false)

function departmentChanged(department?: DepartmentEntity) {
  request.value.filter.departmentId = department?.id || undefined
  onGetList()
}

async function getDepartmentList() {
  departmentList.value = await DepartmentService.create(isLoadingTree).getList(new QueryRequest(DepartmentEntity))
}

getDepartmentList()
</script>

<template>
  <ATreeBox
    :tree-data="departmentList"
    searchable
    @change="departmentChanged"
  >
    <APanel title="">
      <ATable
        v-loading="isLoading"
        :data-list="response.list"
        :entity="UserEntity"
        :service="UserService"
        ctrl-width="150"
        show-enable-and-disable
        @add="onAdd"
        @delete="onDelete"
        @edit="onEdit"
        @search="onSearch"
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

<style lang="scss" scoped></style>
