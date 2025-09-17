<script lang="ts" setup>
import {BillAuditOrReject} from '@/component'
import {useBillTable} from '@/hook/billTable/useBillTable'
import {PurchaseService} from '@/model/channel/purchase/PurchaseService'
import {PurchaseStatusEnum} from '@/model/channel/purchase/PurchaseStatusEnum'
import {APanel, ATable} from '@airpower/web'
import {PurchaseDetail, PurchaseEditor} from './component'

const hook = useBillTable(PurchaseService, {
  editView: PurchaseEditor,
  detailView: PurchaseDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => row.status !== PurchaseStatusEnum.REJECTED.key"
      :use-hook="hook"
      ctrl-width="160"
      hide-delete
      show-detail
    >
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
