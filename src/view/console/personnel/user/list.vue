<template>
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
</template>

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { UserEditor } from './component'

const {
  isLoading,
  response,
  onPageChanged,
  onDelete,
  onEdit,
  onAdd,
  onSearch,
  onEnable,
  onDisable,
} = useAirTable(UserEntity, UserService, {
  editView: UserEditor,
})
</script>
<style lang="scss" scoped></style>
