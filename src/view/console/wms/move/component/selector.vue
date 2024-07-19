<template>
  <ASelector
    :entity="MoveEntity"
    :service="MoveService"
    :props="props"
    :before-search="requestData => {
      requestData.filter.status = SaleStatusEnum.OUTPUTING.key
      return requestData
    }"
    :editor="MoveEditor"
  >
    <template #storageName="{ data }">
      {{ data.storage.name }}({{ data.storage.code }})
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { MoveEditor } from '.'

const props = defineProps(airPropsSelector<MoveEntity>())

</script>
<style scoped lang="scss"></style>
