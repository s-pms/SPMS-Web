<script lang="ts" setup>
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { PurchaseEditor } from '.'

const props = defineProps(airPropsSelector<PurchaseEntity>(new PurchaseEntity()))
</script>

<template>
  <ASelector
    :before-search="
      (requestData) => {
        requestData.filter.status = PurchaseStatusEnum.DONE.key
        return requestData
      }
    "
    :editor="PurchaseEditor"
    :entity="PurchaseEntity"
    :props="props"
    :service="PurchaseService"
  />
</template>

<style lang="scss" scoped></style>
