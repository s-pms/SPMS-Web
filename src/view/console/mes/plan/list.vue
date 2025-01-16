<template>
  <APanel>
    <AToolBar
      :entity="PlanEntity"
      :loading="isLoading"
      :service="PlanService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-edit="row => PlanStatusEnum.REJECTED.notEqualsKey(row.status)"
      :entity="PlanEntity"
      :select-list="selectList"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
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

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { PlanDetail, PlanEditor } from './component'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PlanStatusEnum } from '@/model/mes/plan/PlanStatusEnum'
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
  onAudit,
  onReject,
} = useBillTable(PlanEntity, PlanService, {
  editView: PlanEditor,
  detailView: PlanDetail,
})
</script>
<style lang="scss" scoped></style>
