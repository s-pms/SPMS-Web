<script lang="ts" setup>
import type { IEnum } from '@airpower/web'
import { ADialog, AFormField, DialogProps, useEditor } from '@airpower/web'
import { ref } from 'vue'
import { NotifyChannelEnum } from '@/model/open/notify/NotifyChannelEnum'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'

import { NotifyService } from '@/model/open/notify/NotifyService'

const props = defineProps(DialogProps.withParam(new NotifyEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, NotifyService)

const sceneList = ref<IEnum[]>([])

async function init() {
  sceneList.value = await NotifyService.create().getSceneList()
}

init()
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    hide-fullscreen
    min-height="100px"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField
        :list="sceneList"
        field="scene"
      />
      <AFormField field="channel" />
      <AFormField field="url" />
      <AFormField
        v-if="NotifyChannelEnum.WEB_HOOK.equalsKey(formData.channel)"
        field="token"
      />
      <AFormField
        v-if="NotifyChannelEnum.WEB_HOOK.equalsKey(formData.channel)"
        field="token"
      />
      <AFormField field="remark" />
    </el-form>
  </ADialog>
</template>
