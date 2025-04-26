<script lang="ts" setup>
import type { OutputEntity } from '@/model/wms/output/OutputEntity'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { OutputService } from '@/model/wms/output/OutputService'
import { OutputStatusEnum } from '@/model/wms/output/OutputStatusEnum'
import { OutputDetail, OutputEditor } from '@/view/console/wms/output/component'
import { APage, APanel, ATable } from '@airpower/web'

const {
  isLoading,
  response,
  selectList,
  onSearch,
  onAdd,
  onEdit,
  onPageChanged,
  onSortChanged,
  onSelected,
  onDetail,
  onAudit,
  onReject,
} = useBillTable(OutputService, {
  editView: OutputEditor,
  detailView: OutputDetail,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row: OutputEntity) => !OutputStatusEnum.REJECTED.equalsKey(row.status)"
      :entity="OutputEntity"
      :select-list="selectList"
      :service="OutputService"
      ctrl-width="160"
      hide-delete
      show-detail
      @add="onAdd"
      @edit="onEdit"
      @search="onSearch"
      @detail="onDetail"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
      <template #customRow="{ data }">
        <BillAuditOrReject
          :bill="data"
          @on-audit="onAudit"
          @on-reject="onReject"
        />
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
