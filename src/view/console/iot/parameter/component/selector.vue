<script lang="ts" setup>
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { ParameterEditor } from '.'

const props = defineProps(airPropsSelector<ParameterEntity>())
</script>

<template>
  <ASelector
    :editor="ParameterEditor"
    :entity="ParameterEntity"
    :props="props"
    :service="ParameterService"
    width="600px"
  />
</template>

<style lang="scss" scoped></style>
