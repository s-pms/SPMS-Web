<script lang="ts" setup>
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'

import { ASelector, DialogProps } from '@airpower/web'
import { MoveEditor } from '.'

const props = defineProps(DialogProps.withSelector<MoveEntity>())
</script>

<template>
  <ASelector
    :before-search="
      (requestData) => {
        requestData.filter.status = SaleStatusEnum.OUTPUTTING.key
        return requestData
      }
    "
    :editor="MoveEditor"
    :entity="MoveEntity"
    :props="props"
    :service="MoveService"
  >
    <template #storageName="{ data }">
      {{ data.storage.name }}({{ data.storage.code }})
    </template>
  </ASelector>
</template>

<style lang="scss" scoped></style>
