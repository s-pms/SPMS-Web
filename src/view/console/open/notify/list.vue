<script lang="ts" setup>
import type { IWebEnum } from '@airpower/web'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { NotifyService } from '@/model/open/notify/NotifyService'

import { NotifyEditor } from '@/view/console/open/notify/component'
import { APage, APanel, ATable, useTable } from '@airpower/web'
import { ref } from 'vue'

const { isLoading, response, onSearch, onDelete, onEdit, onPageChanged, onSortChanged, onDisable, onEnable, onAdd }
  = useTable(NotifyService, {
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
    <AToolBar
      :entity="NotifyEntity"
      :loading="isLoading"
      :service="NotifyService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="NotifyEntity"
      ctrl-width="130"
      show-enable-and-disable
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @on-disable="onDisable"
      @on-enable="onEnable"
    >
      <template #scene="row">
        {{ sceneList.find(item => item.key === row.data.scene)?.label || '-' }}
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
