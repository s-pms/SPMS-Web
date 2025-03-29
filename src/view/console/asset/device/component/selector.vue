<script lang="ts" setup>
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { DeviceEditor } from '.'

const props = defineProps(airPropsSelector<DeviceEntity>())
</script>

<template>
  <ASelector
    :editor="DeviceEditor"
    :entity="DeviceEntity"
    :props="props"
    :service="DeviceService"
  />
</template>

<style lang="scss" scoped></style>
