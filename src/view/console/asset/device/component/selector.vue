<template>
  <ASelector
    :entity="DeviceEntity"
    :service="DeviceService"
    :props="props"
    :editor="DeviceEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { DeviceEditor } from '.'

const props = defineProps(airPropsSelector<DeviceEntity>())
</script>
<style scoped lang="scss"></style>
