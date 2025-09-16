<script lang="ts" setup>
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'

import { ASelector, DialogProps } from '@airpower/web'
import { InputEditor } from '.'

const props = defineProps(DialogProps.withSelector<InputEntity>())
</script>

<template>
  <ASelector
    :editor="InputEditor"
    :entity="InputEntity"
    :props="props"
    :service="InputService"
  >
    <template #storageName="{ data }">
      {{ data.storage.name }}({{ data.storage.code }})
    </template>
  </ASelector>
</template>

<style lang="scss" scoped></style>
