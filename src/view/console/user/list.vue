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
      :disable-delete="(row: UserEntity) => row.isSystem"
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
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { UserEditor } from './component'

const {
  isLoading, response,
  onPageChanged, onDelete, onEdit, onAdd, onSearch,
} = useAirTable(UserEntity, UserService, {
  editView: UserEditor,
})

</script>
<style scoped lang="scss"></style>
