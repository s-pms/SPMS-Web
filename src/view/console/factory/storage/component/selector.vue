<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

const props = defineProps(DialogProps.withSelector(new StorageEntity()))
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
