<template>
  <ASelector
    :before-search="requestData => {
      requestData.filter.status = PickingStatusEnum.DONE.key
      return requestData
    }"
    :editor="PickingEditor"
    :entity="PickingEntity"
    :props="props"
    :service="PickingService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PickingEditor } from '.'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'

const props = defineProps(airPropsSelector<PickingEntity>(new PickingEntity()))

</script>
<style lang="scss" scoped></style>
