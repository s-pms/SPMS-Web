<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { MoveService } from '@/model/wms/move/MoveService'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'
import { APanel, ATable } from '@airpower/web'
import { MoveDetail, MoveEditor } from './component'

const hook = useBillTable(MoveService, {
  editView: MoveEditor,
  detailView: MoveDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !MoveStatusEnum.REJECTED.equalsKey(row.status)"
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
