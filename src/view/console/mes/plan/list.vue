<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PlanEntity"
      :service="PlanService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PlanEntity"
      :select-list="selectList"
      :disable-edit="(row: PlanEntity) => row.status !== PlanStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customerCode="row">
        {{ (row.data as PlanEntity).customer?.code || "-" }}
      </template>
      <template #customerName="row">
        {{ (row.data as PlanEntity).customer?.name || "-" }}
      </template>
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as PlanEntity).status !== PlanStatus.AUDITING"
          @click="onAudit(row.data)"
        />
        <AButton
          icon-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as PlanEntity).status !== PlanStatus.AUDITING"
          @click="onReject(row.data)"
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
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { PlanDetail, PlanEditor } from './component'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { PlanStatus } from '@/model/mes/plan/PlanStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(PlanEntity, PlanService, {
  editView: PlanEditor,
  detailView: PlanDetail,
})
</script>
<style scoped lang="scss"></style>
