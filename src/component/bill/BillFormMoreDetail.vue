<script setup lang="ts" generic="B extends AbstractBaseBillEntity<D>, D extends AbstractBaseBillDetailEntity">
import { ADateTime, AFormField, AGroup } from '@/airpower/component'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

const { bill } = defineProps<{
  /**
   * # 单据
   */
  bill: B
}>()

</script>

<template>
  <AGroup
    hide-title
    :column="3"
  >
    <AFormField
      field="createTime"
      disabled
    >
      <ADateTime :time="bill.createTime" />
    </AFormField>
    <AFormField
      field="updateTime"
      disabled
    >
      <ADateTime :time="bill.updateTime" />
    </AFormField>
    <AFormField
      field="status"
      disabled
    />
    <AFormField
      v-if="bill.isRejected()"
      style="width: 100%"
      field="rejectReason"
      disabled
    />
  </AGroup>
</template>

<style scoped lang="scss"></style>
