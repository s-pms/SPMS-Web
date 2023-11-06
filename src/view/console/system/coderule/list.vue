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
      :ctrl-width="105"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
    >
      <template #tableId="row">
        {{ getFieldName(row.data) }}
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
import { CodeRuleField } from '@/model/system/coderule/CodeRuleField'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(CodeRuleEntity, CodeRuleService, {
  editView: CodeRuleEditor,
})

const fieldList = ref([] as CodeRuleField[])

async function getTableList() {
  fieldList.value = await CodeRuleService.create(isLoading).getFieldList()
}

getTableList()

function getFieldName(codeRule: CodeRuleEntity) {
  return fieldList.value.find((item) => item.value === codeRule.ruleField)?.label || ''
}

</script>
<style scoped lang="scss"></style>
