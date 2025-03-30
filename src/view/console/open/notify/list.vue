<script lang="ts" setup>
import type { IDictionary } from '@airpower/interface/IDictionary'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { NotifyService } from '@/model/open/notify/NotifyService'
import { NotifyEditor } from '@/view/console/open/notify/component'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { useAirTable } from '@airpower/hook/useAirTable'
import { AirDictionaryArray } from '@airpower/model/extend/AirDictionaryArray'
import { computed, ref } from 'vue'

const { isLoading, response, onSearch, onDelete, onEdit, onPageChanged, onSortChanged, onDisable, onEnable, onAdd }
  = useAirTable(NotifyEntity, NotifyService, {
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
  <APanel>
    <AToolBar
      :entity="NotifyEntity"
      :loading="isLoading"
      :service="NotifyService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="response.list"
      :entity="NotifyEntity"
      :field-list="fieldList"
      show-enable-and-disable
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
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
