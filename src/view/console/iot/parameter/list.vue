<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="ParameterEntity"
      :service="ParameterService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="ParameterEntity"
      :select-list="selectList"
      :disable-delete="row => row.isSystem"
      :disable-edit="row => row.isSystem"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
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
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { ParameterEditor } from './component'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(ParameterEntity, ParameterService, {
  editView: ParameterEditor,
})
</script>
<style scoped lang="scss"></style>
