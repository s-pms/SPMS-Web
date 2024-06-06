<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="DeviceEntity"
      :service="DeviceService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="DeviceEntity"
      :select-list="selectList"
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="row">
        <AButton
          type="MONITOR"
          link-button
          tooltip="实时监控"
          :disabled="!row.data.isReporting"
          @click="showMonitor(row.data)"
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

<script lang="ts" setup>
import {
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { DeviceEditor, DeviceMonitor } from './component'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { AirDialog } from '@/airpower/helper/AirDialog'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(DeviceEntity, DeviceService, {
  editView: DeviceEditor,
})

async function showMonitor(device: DeviceEntity) {
  AirDialog.show(DeviceMonitor, device)
}
</script>
<style scoped lang="scss"></style>
