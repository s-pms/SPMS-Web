<template>
  <ASelector
    :editor="BomEditor"
    :entity="BomEntity"
    :props="props"
    :service="BomService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { BomEditor } from '.'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'

const props = defineProps(airPropsSelector<BomEntity>())

</script>
<style lang="scss" scoped></style>
