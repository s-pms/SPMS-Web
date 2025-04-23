<script lang="ts" setup>
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'

import { APage, APanel, ATable } from '@airpower/web'
import { OperationEditor } from './component'

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onPageChanged,
} = useTable(OperationService, {
  editView: OperationEditor,
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="OperationEntity"
      :loading="isLoading"
      :service="OperationService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OperationEntity"
      @edit="onEdit"
      @delete="onDelete"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
