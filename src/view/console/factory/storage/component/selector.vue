<script lang="ts" setup>
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'

const props = defineProps(airPropsSelector(new StorageEntity()))
</script>

<template>
  <ASelector
    :entity="StorageEntity"
    :props="props"
    :service="StorageService"
    :un-paginate="true"
  />
</template>

<style lang="scss" scoped></style>
