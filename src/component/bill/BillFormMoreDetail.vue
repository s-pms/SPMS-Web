<script generic="B extends AbstractBaseBillEntity<D>, D extends AbstractBaseBillDetailEntity" lang="ts" setup>
import type { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { ADateTime, AFormField, AGroup } from '@airpower/web'

const { bill } = defineProps<{
  /**
   * ### 单据
   */
  bill: B
}>()
</script>

<template>
  <AGroup
    :column="3"
    hide-title
  >
    <AFormField
      disabled
      field="createTime"
    >
      <ADateTime :time="bill.createTime" />
    </AFormField>
    <AFormField
      disabled
      field="updateTime"
    >
      <ADateTime :time="bill.updateTime" />
    </AFormField>
    <AFormField
      disabled
      field="status"
    />
    <AFormField
      v-if="bill.isRejected()"
      disabled
      field="rejectReason"
      style="width: 100%"
    />
  </AGroup>
</template>

<style lang="scss" scoped></style>
