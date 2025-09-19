<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { PurchaseEditor } from '.'

const props = defineProps(DialogProps.withSelector<PurchaseEntity>(new PurchaseEntity()))
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
