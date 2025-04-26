<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

import { MaterialService } from '@/model/asset/material/MaterialService'
import { APage, APanel, ATable, getTableConfigList } from '@airpower/web'
import { MaterialEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(MaterialService, {
    editView: MaterialEditor,
  })

console.log((new MaterialEntity()))
console.log(getTableConfigList(MaterialEntity))
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="MaterialEntity"
      :select-list="selectList"
      :service="MaterialService"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
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
