<script lang="ts" setup>
import {BomEntity} from '@/model/mes/bom/BomEntity'
import {BomService} from '@/model/mes/bom/BomService'
import {ASelector, DialogProps} from '@airpower/web'
import {BomEditor} from '.'

const props = defineProps(DialogProps.withSelector<BomEntity>())
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
