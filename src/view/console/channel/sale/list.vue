<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SaleEntity"
      :service="SaleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SaleEntity"
      :select-list="selectList"
      :disable-edit="(row: SaleEntity) => !SaleStatusEnum.REJECTED.equalsKey(row.status)"
      hide-delete
      show-detail
      :ctrl-width="160"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customerCode="row">
        {{ (row.data as SaleEntity).customer?.code || "-" }}
      </template>
      <template #customerName="row">
        {{ (row.data as SaleEntity).customer?.name || "-" }}
      </template>
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
import { SaleDetail, SaleEditor } from './component'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'
import { BillAuditOrReject } from '@/component'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(SaleEntity, SaleService, {
  editView: SaleEditor,
  detailView: SaleDetail,
})
</script>
<style scoped lang="scss"></style>
