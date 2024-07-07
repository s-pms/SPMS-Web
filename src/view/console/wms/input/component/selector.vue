<template>
  <ASelector
    :entity="InputEntity"
    :service="InputService"
    :props="props"
    :editor="InputEditor"
  >
    <template #storageName="{ data }">
      {{ data.storage.name }}({{ data.storage.code }})
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputEditor } from '.'

const props = defineProps(airPropsSelector<InputEntity>())

</script>
<style scoped lang="scss"></style>
