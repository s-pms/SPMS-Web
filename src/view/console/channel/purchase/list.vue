<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { PurchaseDetail, PurchaseEditor } from './component'

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
  onReject,
  onAudit,
} = useBillTable(PurchaseService, {
  editView: PurchaseEditor,
  detailView: PurchaseDetail,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => row.status !== PurchaseStatusEnum.REJECTED.key"
      :entity="PurchaseEntity"
      :select-list="selectList"
      :service="PurchaseService"
      ctrl-width="160"
      hide-delete
      show-detail
      @add="onAdd"
      @edit="onEdit"
      @search="onSearch"
      @on-detail="onDetail"
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
