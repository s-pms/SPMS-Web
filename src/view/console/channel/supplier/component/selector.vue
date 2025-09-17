<script lang="ts" setup>
import {SupplierEntity} from '@/model/channel/supplier/SupplierEntity'
import {SupplierService} from '@/model/channel/supplier/SupplierService'
import {ASelector, DialogProps} from '@airpower/web'
import {SupplierEditor} from '.'

const props = defineProps(DialogProps.withSelector<SupplierEntity>())
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
