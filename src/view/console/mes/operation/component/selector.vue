<script lang="ts" setup>
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { OperationEditor } from '.'

const props = defineProps(airPropsSelector<OperationEntity>())
</script>

<template>
  <ASelector
    :editor="OperationEditor"
    :entity="OperationEntity"
    :props="props"
    :service="OperationService"
  />
</template>

<style lang="scss" scoped></style>
