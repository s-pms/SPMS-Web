<template>
  <ASelector
    :editor="DeviceEditor"
    :entity="DeviceEntity"
    :props="props"
    :service="DeviceService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { DeviceEditor } from '.'

const props = defineProps(airPropsSelector<DeviceEntity>())
</script>
<style lang="scss" scoped></style>
