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
      <template #ruleField="row">
        {{ getFieldName(row.data) }}
      </template>
      <template #nextCode="row">
        {{ (row.data as CodeRuleEntity).prefix }}{{ nextCode(row.data) }}{{ padZero((row.data as
          CodeRuleEntity).currentSn + 1, (row.data as CodeRuleEntity).snLength) }}
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
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { CodeRuleParam } from '@/model/system/coderule/CodeRuleParam'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(CodeRuleEntity, CodeRuleService, {
  editView: CodeRuleEditor,
})

const fieldList = ref([] as CodeRuleField[])

async function getFieldList() {
  fieldList.value = await CodeRuleService.create(isLoading).getFieldList()
}

getFieldList()

function getFieldName(codeRule: CodeRuleEntity) {
  return fieldList.value.find((item) => item.value === codeRule.ruleField)?.label || ''
}

const paramList = ref([] as CodeRuleParam[])
async function getParamList() {
  paramList.value = await CodeRuleService.create(isLoading).getParamList()
}
getParamList()

function nextCode(codeRule: CodeRuleEntity) {
  let code = codeRule.template
  for (const item of paramList.value) {
    if (['yyyy', 'mm', 'dd', 'hh'].includes(item.label)) {
      code = code.replaceAll(item.label, AirDateTime.formatFromDate(new Date(), item.label.toUpperCase()))
    }
    if (['yy'].includes(item.label)) {
      code = code.replaceAll(item.label, AirDateTime.formatFromDate(new Date(), 'YYYY').substring(2))
    }
  }
  return code
}

function padZero(num: number, length: number) {
  const str = num.toString()
  return str.length < length ? '0'.repeat(length - str.length) + str : str
}
</script>
<style scoped lang="scss"></style>
