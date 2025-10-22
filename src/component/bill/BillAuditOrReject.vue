<script generic="B extends AbstractBaseBillEntity<D>, D extends AbstractBaseBillDetailEntity" lang="ts" setup>
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { AButton } from '@airpower/web'

const { bill } = defineProps<{
  /**
   * ### 单据
   */
  bill: B
}>()

const emits = defineEmits<{
  onReject: [bill: B]
  onAudit: [bill: B]
}>()
</script>

<template>
  <AButton
    :disabled="!bill.canAudit()"
    link
    @click="emits('onAudit', bill)"
  >
    审核
  </AButton>
  <AButton
    :disabled="!bill.canReject()"
    link
    @click="emits('onReject', bill)"
  >
    驳回
  </AButton>
</template>

<style lang="scss" scoped></style>
