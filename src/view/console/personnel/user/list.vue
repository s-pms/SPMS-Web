<script lang="ts" setup>
import type { Ref } from 'vue'

import { useMyTable } from '@/hook/useMyTable'
import { DepartmentEntity } from '@/model/personnel/department/DepartmentEntity'
import { DepartmentService } from '@/model/personnel/department/DepartmentService'
import { UserService } from '@/model/personnel/user/UserService'
import { APanel, ATable, ATreeBox, QueryRequest } from '@airpower/web'
import { ref } from 'vue'
import { UserEditor } from './component'

const hook = useMyTable(UserService, {
  editView: UserEditor,
})

const departmentList: Ref<DepartmentEntity[]> = ref([])

const isLoadingTree = ref(false)

function departmentChanged(department?: DepartmentEntity) {
  hook.request.value.filter.departmentId = department?.id || undefined
  hook.onGetList()
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
    @changed="departmentChanged"
  >
    <APanel>
      <ATable
        :use-hook="hook"
        ctrl-width="150"
        show-enable-and-disable
      />
    </APanel>
  </ATreeBox>
</template>

<style lang="scss" scoped></style>
