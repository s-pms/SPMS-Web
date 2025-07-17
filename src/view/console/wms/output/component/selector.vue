<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { OutputEntity } from '@/model/wms/output/OutputEntity'

import { OutputService } from '@/model/wms/output/OutputService'
import { OutputEditor } from '.'

const props = defineProps(DialogProps.withSelector<OutputEntity>())
</script>

<template>
  <ASelector
    :editor="OutputEditor"
    :entity="OutputEntity"
    :props="props"
    :service="OutputService"
  />
</template>

<style lang="scss" scoped></style>
