<script lang="ts" setup>
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'

import { ASelector } from '@airpower/web'
import { CustomerEditor } from '.'

const props = defineProps(DialogProps.withSelector<CustomerEntity>())
</script>

<template>
  <ASelector
    :editor="CustomerEditor"
    :entity="CustomerEntity"
    :props="props"
    :service="CustomerService"
  />
</template>

<style lang="scss" scoped></style>
