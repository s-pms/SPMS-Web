<script lang="ts" setup>
import { ContractEntity } from '@/model/asset/contract/ContractEntity'
import { ContractService } from '@/model/asset/contract/ContractService'
import { ContractStatusEnum } from '@/model/asset/contract/ContractStatusEnum'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { ContractEditor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(ContractService, {
    editView: ContractEditor,
  })
</script>

<template>
  <APanel>
    <AToolBar
      :entity="ContractEntity"
      :loading="isLoading"
      :service="ContractService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="row => ContractStatusEnum.INVALID.notEqualsKey(row.status)"
      :disable-edit="row => ContractStatusEnum.INVALID.notEqualsKey(row.status)"
      :entity="ContractEntity"
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
