<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
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
} = useMyTable(OperationService, {
  editView: OperationEditor,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OperationEntity"
      :service="OperationService"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
