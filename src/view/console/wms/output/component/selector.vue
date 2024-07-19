<template>
  <ASelector
    :entity="OutputEntity"
    :service="OutputService"
    :props="props"
    :editor="OutputEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { OutputEditor } from '.'

const props = defineProps(airPropsSelector<OutputEntity>())
</script>
<style scoped lang="scss"></style>
