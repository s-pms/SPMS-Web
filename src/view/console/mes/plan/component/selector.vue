<template>
  <ASelector
    :entity="PlanEntity"
    :service="PlanService"
    width="60%"
    :props="props"
    :editor="PlanEditor"
  >
    <template #customerCode="{ data }">
      {{ data.customer?.code || "-" }}
    </template>
    <template #customerName="{ data }">
      {{ data.customer?.name || "-" }}
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { PlanEditor } from '.'

const props = defineProps(airPropsSelector<PlanEntity>())

</script>
<style scoped lang="scss"></style>
