<script lang="ts" setup>
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { OutputEditor } from '.'

const props = defineProps(airPropsSelector<OutputEntity>())
</script>

<template>
  <ASelector
    :editor="OutputEditor"
    :entity="OutputEntity"
    :props="props"
    :service="OutputService"
  />
</template>

<style lang="scss" scoped></style>
