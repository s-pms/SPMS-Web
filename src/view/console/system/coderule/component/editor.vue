<script lang="ts" setup>
import type { CodeRuleField } from '@/model/system/coderule/CodeRuleField'
import type { CodeRuleParam } from '@/model/system/coderule/CodeRuleParam'
import { CodeRuleEntity } from '@/model/system/coderule/CodeRuleEntity'
import { CodeRuleService } from '@/model/system/coderule/CodeRuleService'
import { ADialog, AFormField, AGroup, AInput } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { AirInputType } from '@airpower/enum/AirInputType'
import { AirDateTime } from '@airpower/helper/AirDateTime'
import { AirValidator } from '@airpower/helper/AirValidator'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { computed, ref } from 'vue'

const props = defineProps(airPropsParam(new CodeRuleEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, CodeRuleService, {
  customRules: {
    prefix: [
      AirValidator.show('前缀只允许字母/数字/横线/下划线').ifNot(AirInputType.LETTER, AirInputType.NUMBER, '\\-', '_'),
    ],
    template: [
      AirValidator.show('模板只允许字母/数字/横线/下划线').ifNot(AirInputType.LETTER, AirInputType.NUMBER, '\\-', '_'),
    ],
  },
})

const fieldList = ref<CodeRuleField[]>([])

async function getFieldList() {
  fieldList.value = await CodeRuleService.create(isLoading).getFieldList()
}

getFieldList()

const paramList = ref<CodeRuleParam[]>([])

async function getParamList() {
  paramList.value = await CodeRuleService.create(isLoading).getParamList()
}

getParamList()

function fieldChanged(fieldId: number) {
  formData.value.prefix = fieldList.value.find(item => item.key === fieldId)?.defaultPrefix || formData.value.prefix
}

function paramClicked(param: CodeRuleParam) {
  formData.value.template += param.label
}

const demoCode = computed(() => {
  let code = formData.value.template
  for (const item of paramList.value) {
    if (['yyyy', 'mm', 'dd', 'hh'].includes(item.label)) {
      code = code.replaceAll(item.label, AirDateTime.formatFromDate(new Date(), item.label.toUpperCase()))
    }
    if (['yy'].includes(item.label)) {
      code = code.replaceAll(item.label, AirDateTime.formatFromDate(new Date(), 'YYYY').substring(2))
    }
  }
  return code
})
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title + CodeRuleEntity.getModelName()"
    height="550px"
    width="800px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="140px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="基础配置"
      >
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('ruleField')"
          prop="ruleField"
        >
          <AInput
            v-model.ruleField="formData.ruleField"
            :disabled="!!formData.id"
            :entity="CodeRuleEntity"
            :list="
              fieldList.map((item) => {
                return {
                  key: item.key,
                  label: item.label,
                }
              })
            "
            @on-change="fieldChanged"
          />
        </el-form-item>
        <AFormField field="snType" />
        <AFormField field="prefix" />
        <AFormField field="snLength" />
      </AGroup>
      <AGroup title="模板配置">
        <el-form-item label="可选参数">
          <el-tag
            v-for="param in paramList"
            :key="param.value"
            class="param-item"
            @click="paramClicked(param)"
          >
            {{ param.desc }}
          </el-tag>
        </el-form-item>
        <AFormField field="template" />
        <el-form-item
          v-if="formData.prefix || demoCode"
          label="示例编码"
        >
          <span style="margin: 0 2px; color: red; font-weight: bold">{{ formData.prefix }}</span>
          <span style="margin: 0 2px; color: darkgreen; font-weight: bold">{{ demoCode }}</span>
          <span style="margin: 0 2px; color: blue; font-weight: bold">{{
            '1'.padStart(Math.min(formData.snLength, 10), '0')
          }}</span>
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped>
.param-item {
  margin: 0 2px;
  cursor: pointer;
}
</style>
