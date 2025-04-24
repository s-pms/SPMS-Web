<script lang="ts" setup>
import { LogEntity } from '@/model/system/log/LogEntity'
import { LogService } from '@/model/system/log/LogService'

import { APage, APanel, ATable, WebColor } from '@airpower/web'
import Detail from './detail.vue'
import { useMyTable } from '@/hook/useMyTable'

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
      :service="LogService"
      hide-add
      @search="onSearch"
      v-loading="isLoading"
      :data-list="response.list"
      :entity="LogEntity"
      :select-list="selectList"
      ctrl-width="60"
      hide-delete
      hide-edit
      show-detail
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
      @on-detail="onDetail"
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
