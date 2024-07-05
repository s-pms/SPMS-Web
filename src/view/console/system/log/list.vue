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
    >
      <template #penddingTime="{ data }">
        <el-tag
          :color="getColor(data)"
          effect="dark"
          disable-transitions
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

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { LogEntity } from '@/model/system/log/LogEntity'
import { LogService } from '@/model/system/log/LogService'
import Detail from './detail.vue'
import { AirColor } from '@/airpower/enum/AirColor'

const {
  isLoading,
  response,
  selectList,
  onSearch, onPageChanged, onSortChanged, onSelected, onDetail,
} = useAirTable(LogEntity, LogService, {
  detailView: Detail,
})

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
<style scoped lang="scss"></style>
