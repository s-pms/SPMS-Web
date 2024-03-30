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
      :disable-edit="(row: SaleEntity) => row.status !== SaleStatus.REJECTED"
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
        {{ (row.data as SaleEntity).customer?.name ||"-" }}
      </template>
      <template #customRow="row">
        <AButton
          link-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as SaleEntity).status !== SaleStatus.AUDITING"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as SaleEntity).status !== SaleStatus.AUDITING"
          @click="onReject(row.data)"
        >
          驳回
        </AButton>
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
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { SaleDetail, SaleEditor } from './component'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleStatus } from '@/model/channel/sale/SaleStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

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
