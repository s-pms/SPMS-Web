<template>
  <ASelector
    :editor="CustomerEditor"
    :entity="CustomerEntity"
    :props="props"
    :service="CustomerService"
  />
</template>

<script lang="ts" setup>
import { ASelector } from '@airpower/component'
import { airPropsSelector } from '@airpower/config/AirProps'
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'
import { CustomerEditor } from '.'

const props = defineProps(airPropsSelector<CustomerEntity>())

</script>
<style lang="scss" scoped></style>
