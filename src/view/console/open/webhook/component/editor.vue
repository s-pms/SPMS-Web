<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    min-height="100px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AFormField
        field="scene"
        :list="sceneList"
      />
      <AFormField field="type" />
      <AFormField field="url" />
      <AFormField
        v-if="WebHookTypeEnum.WEB_HOOK.equalsKey(formData.type)"
        field="token"
      />
      <AFormField field="remark" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { WebHookEntity } from '@/model/open/webhook/WebHookEntity'
import { WebHookService } from '@/model/open/webhook/WebHookService'
import { IDictionary } from '@/airpower/interface/IDictionary'
import { WebHookTypeEnum } from '@/model/open/webhook/WebHookTypeEnum'

const props = defineProps(airPropsParam(new WebHookEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, WebHookEntity, WebHookService)

const sceneList = ref<IDictionary[]>([])

async function init() {
  sceneList.value = await WebHookService.create()
    .getSceneList()
}

init()
</script>
