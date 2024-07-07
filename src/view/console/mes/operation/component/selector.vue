<template>
  <ASelector
    :entity="OperationEntity"
    :service="OperationService"
    :props="props"
    :editor="OperationEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'
import { OperationEditor } from '.'

const props = defineProps(airPropsSelector<OperationEntity>())

</script>
<style scoped lang="scss"></style>
