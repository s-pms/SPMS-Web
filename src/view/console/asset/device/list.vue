<script lang="ts" setup>
import type { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { AButton, APanel, ATable, DialogUtil } from '@airpower/web'
import { useMyTable } from '@/hook/useMyTable'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { DeviceEditor, DeviceMonitor } from './component'

const hook = useMyTable(DeviceService, {
  editView: DeviceEditor,
})

async function showMonitor(device: DeviceEntity) {
  DialogUtil.show(DeviceMonitor, device)
}
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
      ctrl-width="130"
    >
      <template #customRow="{ data }">
        <AButton :disabled="!data.isReporting" link @click="showMonitor(data)">
          监控
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
