<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterService } from '@/model/iot/parameter/ParameterService'
import { ParameterEditor } from '.'

const props = defineProps(DialogProps.withSelector<ParameterEntity>())
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
