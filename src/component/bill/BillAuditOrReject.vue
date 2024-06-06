<template>
  <AButton
    link-button
    tooltip="审核"
    type="CONFIRM"
    :disabled="!bill.canAudit()"
    @click="emits('onAudit',bill)"
  >
    审核
  </AButton>
  <AButton
    link-button
    tooltip="驳回"
    type="LOCK"
    :disabled="!bill.canReject()"
    @click="emits('onReject',bill)"
  >
    驳回
  </AButton>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { AButton } from '@/airpower/component'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

defineProps({
  /**
   * # 单据
   */
  bill: {
    type: Object as PropType<AbstractBaseBillEntity<AbstractBaseBillDetailEntity>>,
    required: true,
  },
})

const emits = defineEmits(['onReject', 'onAudit'])

</script>
<style scoped lang="scss">

</style>
