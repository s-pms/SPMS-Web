<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="CodeRuleEntity"
      :service="CodeRuleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="CodeRuleEntity"
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
    >
      <template #tableId="row">
        {{ tableName(row.data) }}
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { CodeRuleEntity } from '@/model/system/coderule/CodeRuleEntity'
import { CodeRuleService } from '@/model/system/coderule/CodeRuleService'
import { CodeRuleEditor } from './component'
import { CodeRuleTable } from '@/model/system/coderule/CodeRuleTable'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(CodeRuleEntity, CodeRuleService, {
  editView: CodeRuleEditor,
})

const tableList = ref([] as CodeRuleTable[])

async function getTableList() {
  tableList.value = await CodeRuleService.create(isLoading).getTableList()
}

getTableList()

function tableName(codeRule: CodeRuleEntity) {
  const item = tableList.value.find((item) => item.value === codeRule.tableId)
  if (item) {
    return `${item.label}(${item.table})`
  }
  return ''
}

</script>
<style scoped lang="scss"></style>
