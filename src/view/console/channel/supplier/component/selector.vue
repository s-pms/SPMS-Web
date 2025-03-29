<script lang="ts" setup>
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { SupplierEditor } from '.'

const props = defineProps(airPropsSelector<SupplierEntity>())
</script>

<template>
  <ASelector
    :editor="SupplierEditor"
    :entity="SupplierEntity"
    :props="props"
    :service="SupplierService"
  />
</template>

<style lang="scss" scoped></style>
