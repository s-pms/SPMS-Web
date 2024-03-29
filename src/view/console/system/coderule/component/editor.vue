<template>
  <ADialog
    :title="title + CodeRuleEntity.getClassName()"
    :form-ref="formRef"
    :loading="isLoading"
    width="800px"
    height="550px"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="140px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="基础配置"
        :column="2"
      >
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('ruleField')"
          prop="ruleField"
        >
          <AInput
            v-model.ruleField="formData.ruleField"
            :entity="CodeRuleEntity"
            :disabled="!!formData.id"
            :list="fieldList.map(item => {
              return {
                key: item.key,
                label: item.label
              } as IDictionary
            })"
            clearable
            @on-change="fieldChanged"
          />
        </el-form-item>
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('snType')"
          prop="snType"
        >
          <AInput
            v-model.snType="formData.snType"
            :entity="CodeRuleEntity"
          />
        </el-form-item>
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('prefix')"
          prop="prefix"
        >
          <AInput
            v-model.prefix="formData.prefix"
            :entity="CodeRuleEntity"
          />
        </el-form-item>
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('snLength')"
          prop="snLength"
        >
          <AInput
            v-model.snLength="formData.snLength"
            :entity="CodeRuleEntity"
          />
        </el-form-item>
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
        <el-form-item
          :label="CodeRuleEntity.getFormFieldLabel('template')"
          prop="template"
        >
          <AInput
            v-model.template="formData.template"
            :entity="CodeRuleEntity"
          />
        </el-form-item>
        <el-form-item
          v-if="formData.prefix || demoCode"
          label="示例编码"
        >
          <span style="margin: 0px 2px;color:red;font-weight: bold;">{{ formData.prefix }}</span>
          <span style="margin: 0px 2px;color:darkgreen;font-weight: bold;">{{ demoCode }}</span>
          <span style="margin: 0px 2px;color:blue;font-weight: bold;">{{ Array.from({
            length:
              Math.min(formData.snLength, 10) - 1
          }, (_,
              i) => 0).join('') }}1</span>
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ADialog, AGroup, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirInputType } from '@/airpower/enum/AirInputType'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { CodeRuleEntity } from '@/model/system/coderule/CodeRuleEntity'
import { CodeRuleService } from '@/model/system/coderule/CodeRuleService'
import { CodeRuleField } from '@/model/system/coderule/CodeRuleField'
import { IDictionary } from '@/airpower/interface/IDictionary'
import { CodeRuleParam } from '@/model/system/coderule/CodeRuleParam'
import { AirDateTime } from '@/airpower/helper/AirDateTime'

const props = defineProps(airPropsParam(new CodeRuleEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, CodeRuleEntity, CodeRuleService, {
  customRules: {
    prefix: [
      AirValidator.show('前缀只允许字母/数字/横线/下划线').ifNot(AirInputType.LETTER, AirInputType.NUMBER, '\\-', '_'),
    ],
    template: [
      AirValidator.show('模板只允许字母/数字/横线/下划线').ifNot(AirInputType.LETTER, AirInputType.NUMBER, '\\-', '_'),
    ],
  },
})

const fieldList = ref([] as CodeRuleField[])

async function getFieldList() {
  fieldList.value = await CodeRuleService.create(isLoading).getFieldList()
}
getFieldList()

const paramList = ref([] as CodeRuleParam[])
async function getParamList() {
  paramList.value = await CodeRuleService.create(isLoading).getParamList()
}
getParamList()

function fieldChanged(fieldId: number) {
  formData.value.prefix = fieldList.value.find((item) => item.key === fieldId)?.defaultPrefix || formData.value.prefix
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

<style lang="scss" scoped>
.param-item {
  margin: 0px 2px;
  cursor: pointer;
}
</style>
