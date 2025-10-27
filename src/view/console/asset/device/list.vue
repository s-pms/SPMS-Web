<script lang="ts" setup>
import { AButton, APanel, ATable, DialogUtil } from '@airpower/web'
import { ref } from 'vue'
import { useMyTable } from '@/hook/useMyTable'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { DeviceEditor, DeviceMonitor } from './component'

const filter = ref(new DeviceEntity())
filter.value.code = 'Simulator002'
const hook = useMyTable(DeviceService, {
  editView: DeviceEditor,
  // defaultFilter: filter.value,
})

function showMonitor(device: DeviceEntity) {
  DialogUtil.show(DeviceMonitor, device)
}
</script>

<template>
  <APanel>
    <ATable
      :default-filter="filter"
      :use-hook="hook"
      ctrl-width="130"
    >
      <template #customRow="{ data }">
        <AButton
          :disabled="!data.isReporting"
          link
          @click="showMonitor(data)"
        >
          监控
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
