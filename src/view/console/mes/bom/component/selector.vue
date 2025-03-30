<script lang="ts" setup>
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { BomEditor } from '.'

const props = defineProps(airPropsSelector<BomEntity>())
</script>

<template>
  <ASelector
    :editor="BomEditor"
    :entity="BomEntity"
    :props="props"
    :service="BomService"
  />
</template>

<style lang="scss" scoped></style>
