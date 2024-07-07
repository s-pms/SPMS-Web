<template>
  <ASelector
    :entity="ParameterEntity"
    :service="ParameterService"
    :props="props"
    width="600px"
    :editor="ParameterEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { ParameterEditor } from '.'

const props = defineProps(airPropsSelector<ParameterEntity>())

</script>
<style scoped lang="scss"></style>
