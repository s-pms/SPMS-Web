<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { APanel, ATable } from '@airpower/web'
import { SaleDetail, SaleEditor } from './component'

const hook = useBillTable(SaleService, {
  editView: SaleEditor,
  detailView: SaleDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !SaleStatusEnum.REJECTED.equalsKey(row.status)"
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
        <BillAuditOrReject
          :bill="data"
          @on-audit="hook.onAudit"
          @on-reject="hook.onReject"
        />
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
