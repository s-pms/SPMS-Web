<script lang="ts" setup>
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { RoutingEditor } from '.'

const props = defineProps(airPropsSelector<RoutingEntity>())
</script>

<template>
  <ASelector
    :editor="RoutingEditor"
    :entity="RoutingEntity"
    :props="props"
    :service="RoutingService"
  />
</template>

<style lang="scss" scoped></style>
