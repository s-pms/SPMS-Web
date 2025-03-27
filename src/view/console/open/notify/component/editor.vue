<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    min-height="100px"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
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
        v-if="NotifyChannelEnum.WEB_HOOK.equalsKey(formData.type)"
        field="token"
      />
      <AFormField field="remark" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AFormField } from '@airpower/component'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirEditor } from '@airpower/hook/useAirEditor'
import { IDictionary } from '@airpower/interface/IDictionary'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { NotifyService } from '@/model/open/notify/NotifyService'
import { NotifyChannelEnum } from '@/model/open/notify/NotifyChannelEnum'

const props = defineProps(airPropsParam(new NotifyEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useAirEditor(props, NotifyEntity, NotifyService)

const sceneList = ref<IDictionary[]>([])

async function init() {
  sceneList.value = await NotifyService.create()
    .getSceneList()
}

init()
</script>
