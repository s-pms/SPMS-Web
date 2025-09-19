<script lang="ts" setup>
import type { CodeRuleEntity } from '@/model/system/coderule/CodeRuleEntity'
import type { CodeRuleField } from '@/model/system/coderule/CodeRuleField'
import type { CodeRuleParam } from '@/model/system/coderule/CodeRuleParam'
import { APanel, ATable, DateTimeUtil } from '@airpower/web'
import { ref } from 'vue'
import { useMyTable } from '@/hook/useMyTable'
import { CodeRuleService } from '@/model/system/coderule/CodeRuleService'

import { CodeRuleEditor } from '@/view/console/system/coderule/component'

const hook = useMyTable(CodeRuleService, {
  editView: CodeRuleEditor,
})

const fieldList = ref<CodeRuleField[]>([])

async function getFieldList() {
  fieldList.value = await CodeRuleService.create(hook.isLoading).getFieldList()
}

getFieldList()

function getFieldName(codeRule: CodeRuleEntity) {
  return fieldList.value.find(item => item.key === codeRule.ruleField)?.label || ''
}

const paramList = ref<CodeRuleParam[]>([])

async function getParamList() {
  paramList.value = await CodeRuleService.create(hook.isLoading).getParamList()
}

getParamList()

function nextCode(codeRule: CodeRuleEntity) {
  let code = codeRule.template
  for (const item of paramList.value) {
    if (['yyyy', 'mm', 'dd', 'hh'].includes(item.label)) {
      code = code.replaceAll(item.label, DateTimeUtil.formatFromDate(new Date(), item.label.toUpperCase()))
    }
    if (['yy'].includes(item.label)) {
      code = code.replaceAll(item.label, DateTimeUtil.formatFromDate(new Date(), 'YYYY').substring(2))
    }
  }
  return code
}
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
      ctrl-width="105"
      hide-add
      hide-delete
    >
      <template #ruleField="{ data }">
        {{ getFieldName(data) }}
      </template>
      <template #nextCode="{ data }">
        {{ data.prefix }}{{ nextCode(data) }}{{ (data.currentSn + 1).toString().padStart(data.snLength, '0') }}
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
