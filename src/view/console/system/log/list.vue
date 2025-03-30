<script lang="ts" setup>
import { LogEntity } from '@/model/system/log/LogEntity'
import { LogService } from '@/model/system/log/LogService'
import { APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirColor } from '@airpower/enum/AirColor'
import { useAirTable } from '@airpower/hook/useAirTable'
import Detail from './detail.vue'

const { isLoading, response, selectList, onSearch, onPageChanged, onSortChanged, onSelected, onDetail } = useAirTable(
  LogEntity,
  LogService,
  {
    detailView: Detail,
  },
)

function getColor(log: LogEntity) {
  const diff = log.updateTime - log.createTime
  if (diff < 500) {
    return AirColor.SUCCESS
  }
  if (diff < 2000) {
    return AirColor.WARNING
  }
  if (diff < 5000) {
    return AirColor.DANGER
  }
  return AirColor.NORMAL
}
</script>

<template>
  <APanel>
    <AToolBar
      :entity="LogEntity"
      :loading="isLoading"
      :service="LogService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="60"
      :data-list="response.list"
      :entity="LogEntity"
      :select-list="selectList"
      hide-delete
      hide-edit
      show-detail
      @on-sort="onSortChanged"
      @on-select="onSelected"
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
