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
      :disable-edit="(row: PurchaseEntity) => row.status !== PurchaseStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="160"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="row">
        <AButton
          link-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as PurchaseEntity).status !== PurchaseStatus.AUDITING"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as PurchaseEntity).status !== PurchaseStatus.AUDITING"
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
import { PurchaseDetail, PurchaseEditor } from './component'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatus } from '@/model/channel/purchase/PurchaseStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onReject, onAudit,
} = useBillTable(PurchaseEntity, PurchaseService, {
  editView: PurchaseEditor,
  detailView: PurchaseDetail,
})

</script>
<style scoped lang="scss"></style>
