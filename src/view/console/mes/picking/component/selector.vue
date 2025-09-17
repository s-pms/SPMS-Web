<script lang="ts" setup>
import {PickingEntity} from '@/model/mes/picking/PickingEntity'
import {PickingService} from '@/model/mes/picking/PickingService'
import {PickingStatusEnum} from '@/model/mes/picking/PickingStatusEnum'
import {ASelector, DialogProps} from '@airpower/web'
import {PickingEditor} from '.'

const props = defineProps(DialogProps.withSelector<PickingEntity>(new PickingEntity()))
</script>

<template>
  <ASelector
    :before-search="
      (requestData) => {
        requestData.filter.status = PickingStatusEnum.DONE.key
        return requestData
      }
    "
    :editor="PickingEditor"
    :entity="PickingEntity"
    :props="props"
    :service="PickingService"
  />
</template>

<style lang="scss" scoped></style>
