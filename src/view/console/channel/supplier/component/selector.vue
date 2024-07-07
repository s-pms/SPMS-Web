<template>
  <ASelector
    :entity="SupplierEntity"
    :service="SupplierService"
    :props="props"
    :editor="SupplierEditor"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { SupplierEntity } from '@/model/channel/supplier/SupplierEntity'
import { SupplierService } from '@/model/channel/supplier/SupplierService'
import { SupplierEditor } from '.'

const props = defineProps(airPropsSelector<SupplierEntity>())

</script>
<style scoped lang="scss"></style>
