<template>
  <ASelector
    :entity="StorageEntity"
    :service="StorageService"
    :un-paginate="true"
    :props="props"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

const props = defineProps(airPropsSelector<StorageEntity>())

</script>
<style scoped lang="scss"></style>
