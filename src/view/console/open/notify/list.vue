<script lang="ts" setup>
import type { IWebEnum } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { NotifyService } from '@/model/open/notify/NotifyService'
import { NotifyEditor } from '@/view/console/open/notify/component'
import { APanel, ATable } from '@airpower/web'
import { ref } from 'vue'

const hook = useMyTable(NotifyService, {
  editView: NotifyEditor,
})

const sceneList = ref<IWebEnum[]>([])

async function init() {
  sceneList.value = await NotifyService.create().getSceneList()
}

init()
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
      ctrl-width="130"
      show-enable-and-disable
    >
      <template #scene="row">
        {{ sceneList.find(item => item.key === row.data.scene)?.label || '-' }}
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
