<template>
  <ASelector
    :editor="RoutingEditor"
    :entity="RoutingEntity"
    :props="props"
    :service="RoutingService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { RoutingEditor } from '.'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'

const props = defineProps(airPropsSelector<RoutingEntity>())

</script>
<style lang="scss" scoped></style>
