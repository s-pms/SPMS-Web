<script lang="ts" setup>
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialService } from '@/model/asset/material/MaterialService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { MaterialEditor } from '.'

const props = defineProps(airPropsSelector<MaterialEntity>())
</script>

<template>
  <ASelector
    :editor="MaterialEditor"
    :entity="MaterialEntity"
    :props="props"
    :service="MaterialService"
  />
</template>

<style lang="scss" scoped></style>
