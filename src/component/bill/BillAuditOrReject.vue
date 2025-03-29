<script generic="B extends AbstractBaseBillEntity<D>, D extends AbstractBaseBillDetailEntity" lang="ts" setup>
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { AButton } from '@airpower/component'

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

function onReject() {
  emits('onReject', bill)
}

function onAudit() {
  emits('onAudit', bill)
}
</script>

<template>
  <AButton
    :disabled="!bill.canAudit()"
    link-button
    tooltip="审核"
    type="CONFIRM"
    @click="onAudit"
  >
    审核
  </AButton>
  <AButton
    :disabled="!bill.canReject()"
    link-button
    tooltip="驳回"
    type="LOCK"
    @click="onReject"
  >
    驳回
  </AButton>
</template>

<style lang="scss" scoped></style>
