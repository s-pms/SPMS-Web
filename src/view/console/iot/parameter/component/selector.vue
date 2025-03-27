<template>
  <ASelector
    :editor="ParameterEditor"
    :entity="ParameterEntity"
    :props="props"
    :service="ParameterService"
    width="600px"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { ParameterEditor } from '.'

const props = defineProps(airPropsSelector<ParameterEntity>())

</script>
<style lang="scss" scoped></style>
