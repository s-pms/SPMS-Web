<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { LogEntity } from '@/model/system/log/LogEntity'
import { LogService } from '@/model/system/log/LogService'

import { APage, APanel, ATable, WebColor } from '@airpower/web'
import Detail from './detail.vue'

const {
  isLoading,
  response,
  selectList,
  onSearch,
  onPageChanged,
  onSortChanged,
  onSelected,
  onDetail,
} = useMyTable(LogService, {
  detailView: Detail,
})

function getColor(log: LogEntity) {
  const diff = log.updateTime - log.createTime
  if (diff < 500) {
    return WebColor.SUCCESS
  }
  if (diff < 2000) {
    return WebColor.WARNING
  }
  if (diff < 5000) {
    return WebColor.DANGER
  }
  return WebColor.NORMAL
}
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="LogEntity"
      :select-list="selectList"
      :service="LogService"
      ctrl-width="60"
      hide-add
      hide-delete
      hide-edit
      show-detail
      @search="onSearch"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
      @detail="onDetail"
    >
      <template #pendingTime="{ data }">
        <el-tag
          :color="getColor(data)"
          disable-transitions
          effect="dark"
        >
          {{ data.updateTime - data.createTime }}ms
        </el-tag>
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
