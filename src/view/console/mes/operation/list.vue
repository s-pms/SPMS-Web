<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="OperationEntity"
      :service="OperationService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OperationEntity"
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
  APage,
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { OperationEditor } from './component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'

const {
  isLoading, response,
  onSearch, onAdd, onEdit, onDelete, onPageChanged,
} = useAirTable(OperationEntity, OperationService, {
  editView: OperationEditor,
})

</script>
<style scoped lang="scss"></style>
