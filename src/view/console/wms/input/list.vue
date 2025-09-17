<script lang="ts" setup>
import { APanel, ATable } from '@airpower/web'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { InputService } from '@/model/wms/input/InputService'
import { InputStatusEnum } from '@/model/wms/input/InputStatusEnum'
import { InputDetail, InputEditor } from './component'

const hook = useBillTable(InputService, {
  editView: InputEditor,
  detailView: InputDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-edit="(row) => !InputStatusEnum.REJECTED.equalsKey(row.status)"
      :use-hook="hook"
      ctrl-width="200"
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
