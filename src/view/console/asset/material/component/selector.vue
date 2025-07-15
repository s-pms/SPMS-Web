<script lang="ts" setup>
import {ASelector, DialogProps} from '@airpower/web'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

import { MaterialService } from '@/model/asset/material/MaterialService'
import { MaterialEditor } from '.'

const props = defineProps(DialogProps.withSelector<MaterialEntity>())
</script>

<template>
  <ASelector
    :editor="MaterialEditor"
    :entity="MaterialEntity"
    :props="props"
    :service="MaterialService"
  />
</template>

<style lang="scss" scoped></style>
