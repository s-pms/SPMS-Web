<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PickingService } from '@/model/mes/picking/PickingService'
import { PickingStatusEnum } from '@/model/mes/picking/PickingStatusEnum'
import { PickingDetail, PickingEditor } from './component'

const hook = useBillTable(PickingService, {
  editView: PickingEditor,
  detailView: PickingDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => row.status !== PickingStatusEnum.REJECTED.key"
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
