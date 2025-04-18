<script lang="ts" setup>
import type { CodeRuleField } from '@/model/system/coderule/CodeRuleField'
import type { CodeRuleParam } from '@/model/system/coderule/CodeRuleParam'
import { CodeRuleEntity } from '@/model/system/coderule/CodeRuleEntity'
import { CodeRuleService } from '@/model/system/coderule/CodeRuleService'
import { CodeRuleEditor } from '@/view/console/system/coderule/component'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import { useAirTable } from '@airpower/hook/useAirTable'
import { ref } from 'vue'

const {
  isLoading,
  response,
  onSearch,
  onEdit,
  onPageChanged,
  onSortChanged,
} = useAirTable(CodeRuleService, {
  editView: CodeRuleEditor,
})

const fieldList = ref<CodeRuleField[]>([])

async function getFieldList() {
  fieldList.value = await CodeRuleService.create(isLoading).getFieldList()
}

getFieldList()

function getFieldName(codeRule: CodeRuleEntity) {
  return fieldList.value.find(item => item.key === codeRule.ruleField)?.label || ''
}

const paramList = ref<CodeRuleParam[]>([])

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
</script>

<template>
  <APanel>
    <AToolBar
      :entity="CodeRuleEntity"
      :loading="isLoading"
      :service="CodeRuleService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="105"
      :data-list="response.list"
      :entity="CodeRuleEntity"
      hide-delete
      @on-edit="onEdit"
      @on-sort="onSortChanged"
    >
      <template #ruleField="{ data }">
        {{ getFieldName(data) }}
      </template>
      <template #nextCode="{ data }">
        {{ data.prefix }}{{ nextCode(data) }}{{ (data.currentSn + 1).toString().padStart(data.snLength, '0') }}
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

<style lang="scss" scoped></style>
