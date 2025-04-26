<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { PlanStatusEnum } from '@/model/mes/plan/PlanStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { PlanDetail, PlanEditor } from './component'

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
} = useBillTable(PlanService, {
  editView: PlanEditor,
  detailView: PlanDetail,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => !PlanStatusEnum.REJECTED.equalsKey(row.status)"
      :entity="PlanEntity"
      :select-list="selectList"
      :service="PlanService"
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
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
