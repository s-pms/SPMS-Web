<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="LogEntity"
      :service="LogService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="LogEntity"
      :select-list="selectList"
      show-detail
      hide-delete
      hide-edit
      :ctrl-width="60"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
      @on-detail="onDetail"
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
import {
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { LogEntity } from '@/model/system/log/LogEntity'
import { LogService } from '@/model/system/log/LogService'
import Detail from './detail.vue'

const {
  isLoading,
  response,
  selectList,
  onSearch, onPageChanged, onSortChanged, onSelected, onDetail,
} = useAirTable(LogEntity, LogService, {
  detailView: Detail,
})
</script>
<style scoped lang="scss">
</style>
