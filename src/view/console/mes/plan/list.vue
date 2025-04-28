<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PlanService } from '@/model/mes/plan/PlanService'
import { PlanStatusEnum } from '@/model/mes/plan/PlanStatusEnum'
import { APanel, ATable } from '@airpower/web'
import { PlanDetail, PlanEditor } from './component'

const hook = useBillTable(PlanService, {
  editView: PlanEditor,
  detailView: PlanDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !PlanStatusEnum.REJECTED.equalsKey(row.status)"
      :use-hook="hook"
      ctrl-width="160"
      hide-delete
      show-detail
    >
      <template #customerCode="{ data }">
        {{ data.customer?.code || '-' }}
      </template>
      <template #customerName="{ data }">
        {{ data.customer?.name || '-' }}
      </template>
      <template #customRow="{ data }">
        <BillAuditOrReject :bill="data" @on-audit="hook.onAudit" @on-reject="hook.onReject" />
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
