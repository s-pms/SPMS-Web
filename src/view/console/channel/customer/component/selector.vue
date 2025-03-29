<script lang="ts" setup>
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { CustomerEditor } from '.'

const props = defineProps(airPropsSelector<CustomerEntity>())
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
