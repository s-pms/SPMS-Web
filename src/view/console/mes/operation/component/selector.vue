<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { OperationService } from '@/model/mes/operation/OperationService'
import { OperationEditor } from '.'

const props = defineProps(DialogProps.withSelector<OperationEntity>())
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
