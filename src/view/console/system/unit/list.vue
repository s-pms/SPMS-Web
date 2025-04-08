<script lang="ts" setup>
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { UnitEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(UnitService, {
    editView: UnitEditor,
  })
</script>

<template>
  <APanel>
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

<style lang="scss" scoped></style>
