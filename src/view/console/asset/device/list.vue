<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'

import { DeviceService } from '@/model/asset/device/DeviceService'
import { AButton, APage, APanel, ATable, DialogUtil } from '@airpower/web'
import { DeviceEditor, DeviceMonitor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useMyTable(DeviceService, {
    editView: DeviceEditor,
  })

async function showMonitor(device: DeviceEntity) {
  DialogUtil.show(DeviceMonitor, device)
}
</script>

<template>
  <APanel title="">
    <ATable
      :service="DeviceService"
      @add="onAdd"
      @search="onSearch"
      v-loading="isLoading"
      :data-list="response.list"
      :entity="DeviceEntity"
      :select-list="selectList"
      ctrl-width="130"
      @delete="onDelete"
      @edit="onEdit"
      @s="onSortChanged"
      @select-changed="onSelected"
    >
      <template #customRow="{ data }">
        <AButton
          :disabled="!data.isReporting"
          link-button
          tooltip="实时监控"
          type="MONITOR"
          @click="showMonitor(data)"
        >
          监控
        </AButton>
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
