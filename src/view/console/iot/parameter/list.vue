<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'

import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { APage, APanel, ATable } from '@airpower/web'
import { ParameterEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(ParameterService, {
    editView: ParameterEditor,
  })
</script>

<template>
  <APanel title="">
    <ATable
      :service="ParameterService"
      @add="onAdd"
      @search="onSearch"
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
