<script lang="ts" setup>
import {ASelector, DialogProps} from '@airpower/web'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'

import { RoutingService } from '@/model/mes/routing/RoutingService'
import { RoutingEditor } from '.'

const props = defineProps(DialogProps.withSelector<RoutingEntity>())
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
