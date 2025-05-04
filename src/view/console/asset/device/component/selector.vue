<script lang="ts" setup>
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'

import { ASelector, DialogProps } from '@airpower/web'
import { DeviceEditor } from '.'

const props = defineProps(DialogProps.withSelector<DeviceEntity>())
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
