<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PurchaseEntity"
      :service="PurchaseService"
      show-filter
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PurchaseEntity"
      :select-list="selectList"
      :disable-edit="(row: PurchaseEntity) => row.status !== PurchaseStatusEnum.REJECTED.key"
      hide-delete
      show-detail
      :ctrl-width="160"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="row">
        <BillAuditOrReject
          :bill="row.data"
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

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { PurchaseDetail, PurchaseEditor } from './component'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'
import { BillAuditOrReject } from '@/component'

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
} = useBillTable(PurchaseEntity, PurchaseService, {
  editView: PurchaseEditor,
  detailView: PurchaseDetail,
})

</script>
<style scoped lang="scss"></style>
