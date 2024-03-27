<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="UserEntity"
      :service="UserService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="UserEntity"
      :disable-delete="(row: UserEntity) => row.isRootUser()"
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import {
  APanel, ATable, AToolBar, APage,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { UserEditor } from './component'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

const {
  isLoading, response,
  onPageChanged, onDelete, onEdit, onAdd, onSearch,
} = useAirTable(UserEntity, UserService, {
  editView: UserEditor,
})

</script>
<style scoped lang="scss"></style>
