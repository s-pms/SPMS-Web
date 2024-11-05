<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="WebHookEntity"
      :service="WebHookService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="WebHookEntity"
      :field-list="fieldList"
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

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { WebHookEntity } from '@/model/open/webhook/WebHookEntity'
import { WebHookService } from '@/model/open/webhook/WebHookService'
import { NotifyEditor } from '@/view/console/open/webhook/component'
import { IDictionary } from '@/airpower/interface/IDictionary'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

const {
  isLoading,
  response,
  onSearch,
  onDelete,
  onEdit,
  onPageChanged,
  onSortChanged,
  onDisable,
  onEnable,
  onAdd,
} = useAirTable(WebHookEntity, WebHookService, {
  editView: NotifyEditor,
})

const sceneList = ref<IDictionary[]>([])

async function init() {
  sceneList.value = await WebHookService.create()
    .getSceneList()
}

init()

const fieldList = computed(() => WebHookEntity.getTableFieldConfigList()
  .map((item) => {
    if (item.key === 'scene') {
      item.dictionary = AirDictionaryArray.create(sceneList.value)
    }
    return item
  }))
</script>
<style scoped lang="scss"></style>
