<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
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
  />
</template>

<style lang="scss" scoped></style>
