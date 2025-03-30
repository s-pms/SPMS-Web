<script lang="ts" setup>
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { AButton, APage, APanel, ATable, AToolBar } from '@airpower/component'
import { AirDialog } from '@airpower/helper/AirDialog'
import { useAirTable } from '@airpower/hook/useAirTable'
import { DeviceEditor, DeviceMonitor } from './component'

const { isLoading, response, selectList, onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected }
  = useAirTable(DeviceEntity, DeviceService, {
    editView: DeviceEditor,
  })

async function showMonitor(device: DeviceEntity) {
  AirDialog.show(DeviceMonitor, device)
}
</script>

<template>
  <APanel>
    <AToolBar
      :entity="DeviceEntity"
      :loading="isLoading"
      :service="DeviceService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="130"
      :data-list="response.list"
      :entity="DeviceEntity"
      :select-list="selectList"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort="onSortChanged"
      @on-select="onSelected"
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
