<template>
  <ASelector
    :editor="OperationEditor"
    :entity="OperationEntity"
    :props="props"
    :service="OperationService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'
import { OperationEditor } from '.'

const props = defineProps(airPropsSelector<OperationEntity>())

</script>
<style lang="scss" scoped></style>
