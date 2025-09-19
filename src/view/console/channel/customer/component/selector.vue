<script lang="ts" setup>
import { ASelector, DialogProps } from '@airpower/web'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'
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
