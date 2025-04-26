<script lang="ts" setup>
import type { IWebEnum } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'

import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { NotifyService } from '@/model/open/notify/NotifyService'
import { NotifyEditor } from '@/view/console/open/notify/component'
import { APage, APanel, ATable } from '@airpower/web'
import { ref } from 'vue'

const { isLoading, response, onSearch, onDelete, onEdit, onPageChanged, onSortChanged, onDisable, onEnable, onAdd }
  = useMyTable(NotifyService, {
    editView: NotifyEditor,
  })

const sceneList = ref<IWebEnum[]>([])

async function init() {
  sceneList.value = await NotifyService.create().getSceneList()
}

init()
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="NotifyEntity"
      :service="NotifyService"
      ctrl-width="130"
      show-enable-and-disable
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
      @disable="onDisable"
      @enable="onEnable"
    >
      <template #scene="row">
        {{ sceneList.find(item => item.key === row.data.scene)?.label || '-' }}
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
