<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'

import { CustomerService } from '@/model/channel/customer/CustomerService'
import { APanel, ATable } from '@airpower/web'
import { CustomerEditor } from './component'

const hook = useMyTable(CustomerService, {
  editView: CustomerEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :use-hook="hook"
    />
  </APanel>
</template>

<style lang="scss" scoped></style>
