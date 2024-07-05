<template>
  <AButton
    link-button
    tooltip="审核"
    type="CONFIRM"
    :disabled="!bill.canAudit()"
    @click="onAudit"
  >
    审核
  </AButton>
  {{ bill }}
  <AButton
    link-button
    tooltip="驳回"
    type="LOCK"
    :disabled="!bill.canReject()"
    @click="onReject"
  >
    驳回
  </AButton>
</template>
<script setup lang="ts" generic="B extends AbstractBaseBillEntity<D>, D extends AbstractBaseBillDetailEntity">
import { AButton } from '@/airpower/component'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

const { bill } = defineProps<{
  /**
   * # 单据
   */
  bill: B
}>()

const emits = defineEmits<{
  onReject: [bill: B],
  onAudit: [bill: B],
}>()

function onReject() {
  emits('onReject', bill)
}

function onAudit() {
  emits('onAudit', bill)
}

</script>
<style scoped lang="scss"></style>
