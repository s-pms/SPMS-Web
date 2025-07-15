<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { OutputService } from '@/model/wms/output/OutputService'
import { OutputStatusEnum } from '@/model/wms/output/OutputStatusEnum'
import { OutputDetail, OutputEditor } from '@/view/console/wms/output/component'

const hook = useBillTable(OutputService, {
  editView: OutputEditor,
  detailView: OutputDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !OutputStatusEnum.REJECTED.equalsKey(row.status)"
      :use-hook="hook"
      ctrl-width="160"
      hide-delete
      show-detail
    >
      <template #customRow="{ data }">
        <BillAuditOrReject :bill="data" @on-audit="hook.onAudit" @on-reject="hook.onReject" />
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
