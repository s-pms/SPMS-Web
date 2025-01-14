<template>
  <APanel>
    <AToolBar
      :entity="PurchaseEntity"
      :loading="isLoading"
      :service="PurchaseService"
      show-filter
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-edit="row => row.status !== PurchaseStatusEnum.REJECTED.key"
      :entity="PurchaseEntity"
      :select-list="selectList"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #billCode="{data}">
        <PayloadLink
          :payload="data"
          :view="PurchaseDetail"
        />
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
import PayloadLink from '@/component/PayloadLink.vue'

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
<style lang="scss" scoped></style>
