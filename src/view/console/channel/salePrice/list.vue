<script lang="ts" setup>
import {useMyTable} from '@/hook/useMyTable'
import {SalePriceService} from '@/model/channel/salePrice/SalePriceService'
import {APanel, ATable} from '@airpower/web'
import {SalePriceEditor} from './component'

const hook = useMyTable(SalePriceService, {
  editView: SalePriceEditor,
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
