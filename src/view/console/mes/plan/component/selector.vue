<script lang="ts" setup>
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'

import { ASelector, DialogProps } from '@airpower/web'
import { PlanEditor } from '.'

const props = defineProps(DialogProps.withSelector<PlanEntity>())
</script>

<template>
  <ASelector
    :editor="PlanEditor"
    :entity="PlanEntity"
    :props="props"
    :service="PlanService"
    width="60%"
  >
    <template #customerCode="{ data }">
      {{ data.customer?.code || '-' }}
    </template>
    <template #customerName="{ data }">
      {{ data.customer?.name || '-' }}
    </template>
  </ASelector>
</template>

<style lang="scss" scoped></style>
