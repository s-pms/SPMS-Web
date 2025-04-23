<script lang="ts" setup>
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'

import { APage, APanel, ATable } from '@airpower/web'
import { ParameterEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useTable(ParameterService, {
    editView: ParameterEditor,
  })
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="ParameterEntity"
      :loading="isLoading"
      :service="ParameterService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="(row) => row.isSystem"
      :disable-edit="(row) => row.isSystem"
      :entity="ParameterEntity"
      :select-list="selectList"
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
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
