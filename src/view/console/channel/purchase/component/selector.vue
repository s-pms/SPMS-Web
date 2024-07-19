<template>
  <ASelector
    :entity="PurchaseEntity"
    :service="PurchaseService"
    :props="props"
    :before-search="requestData => {
      requestData.filter.status = PurchaseStatusEnum.DONE.key
      return requestData
    }"
    :editor="PurchaseEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { PurchaseEditor } from '.'

const props = defineProps(airPropsSelector<PurchaseEntity>(new PurchaseEntity()))

</script>
<style scoped lang="scss"></style>
