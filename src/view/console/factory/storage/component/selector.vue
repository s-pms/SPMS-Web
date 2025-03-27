<template>
  <ASelector
    :entity="StorageEntity"
    :props="props"
    :service="StorageService"
    :un-paginate="true"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

const props = defineProps(airPropsSelector(new StorageEntity()))

</script>
<style lang="scss" scoped></style>
