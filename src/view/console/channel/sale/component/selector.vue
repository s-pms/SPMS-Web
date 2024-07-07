<template>
  <ASelector
    :entity="SaleEntity"
    :service="SaleService"
    :props="props"
    :before-search="requestData => {
      requestData.filter.status = SaleStatusEnum.OUTPUTING.key
      return requestData
    }"
    :editor="SaleEditor"
  >
    <template #customerCode="{ data }">
      {{ data.customer?.code || "-" }}
    </template>
    <template #customerName="{ data }">
      {{ data.customer?.name || "-" }}
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { SaleEditor } from '.'

const props = defineProps(airPropsSelector<SaleEntity>())

</script>
<style scoped lang="scss"></style>
