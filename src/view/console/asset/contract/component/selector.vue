<script lang="ts" setup>
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { ContractEditor } from '.'

const props = defineProps(airPropsSelector<MaterialEntity>())
</script>

<template>
  <ASelector
    :editor="ContractEditor"
    :entity="MaterialEntity"
    :props="props"
    :service="MaterialService"
  />
</template>

<style lang="scss" scoped></style>
