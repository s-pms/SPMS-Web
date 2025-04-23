<script lang="ts" setup>
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'

import { APage, APanel, ATable } from '@airpower/web'
import { UnitEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useTable(UnitService, {
    editView: UnitEditor,
  })
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="UnitEntity"
      :loading="isLoading"
      :service="UnitService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="UnitEntity"
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
