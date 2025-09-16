<script lang="ts" setup>
import type { LogEntity } from '@/model/system/log/LogEntity'
import { useMyTable } from '@/hook/useMyTable'

import { LogService } from '@/model/system/log/LogService'
import { APanel, ATable, WebColor } from '@airpower/web'
import Detail from './detail.vue'

const hook = useMyTable(LogService, {
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
  <APanel>
    <ATable
      :use-hook="hook"
      ctrl-width="60"
      hide-add
      hide-delete
      hide-edit
      show-detail
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
  </APanel>
</template>

<style lang="scss" scoped></style>
