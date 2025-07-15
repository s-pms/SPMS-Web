<script lang="ts" setup>
import {ASelector, DialogProps} from '@airpower/web'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'

import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { SaleEditor } from '.'

const props = defineProps(DialogProps.withSelector<SaleEntity>())
</script>

<template>
  <ASelector
    :before-search="
      (requestData) => {
        requestData.filter.status = SaleStatusEnum.OUTPUTTING.key
        return requestData
      }
    "
    :editor="SaleEditor"
    :entity="SaleEntity"
    :props="props"
    :service="SaleService"
  >
    <template #customerCode="{ data }">
      {{ data.customer?.code || '-' }}
    </template>
    <template #customerName="{ data }">
      {{ data.customer?.name || '-' }}
    </template>
  </ASelector>
</template>

<style lang="scss" scoped></style>
