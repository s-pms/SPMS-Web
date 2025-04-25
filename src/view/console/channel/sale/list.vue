<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { SaleDetail, SaleEditor } from './component'

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
} = useBillTable(SaleService, {
  editView: SaleEditor,
  detailView: SaleDetail,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => !SaleStatusEnum.REJECTED.equalsKey(row.status)"
      :entity="SaleEntity"
      :select-list="selectList"
      :service="SaleService"
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
      <template #customerCode="{ data }">
        {{ data.customer?.code || '-' }}
      </template>
      <template #customerName="{ data }">
        {{ data.customer?.name || '-' }}
      </template>
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
