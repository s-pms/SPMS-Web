<script lang="ts" setup>
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { NotifyService } from '@/model/open/notify/NotifyService'
import { NotifyEditor } from '@/view/console/open/notify/component'

import { AirDictionaryArray } from '@airpower/model/extend/AirDictionaryArray'
import { APage, APanel, ATable } from '@airpower/web'
import { computed, ref } from 'vue'

const { isLoading, response, onSearch, onDelete, onEdit, onPageChanged, onSortChanged, onDisable, onEnable, onAdd }
  = useTable(NotifyService, {
    editView: NotifyEditor,
  })

const sceneList = ref<IDictionary[]>([])

async function init() {
  sceneList.value = await NotifyService.create().getSceneList()
}

init()

const fieldList = computed(() =>
  NotifyEntity.getTableFieldConfigList().map((item) => {
    if (item.key === 'scene') {
      item.dictionary = AirDictionaryArray.create(sceneList.value)
    }
    return item
  }),
)
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
      :field-list="fieldList"
      ctrl-width="130"
      show-enable-and-disable
      @edit="onEdit"
      @delete="onDelete"
      @sort-changed="onSortChanged"
      @on-disable="onDisable"
      @on-enable="onEnable"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
