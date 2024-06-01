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
      :ctrl-width="160"
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
          link-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="PlanStatusEnum.AUDITING.notEqualsKey((row.data as PlanEntity).status)"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="PlanStatusEnum.AUDITING.notEqualsKey((row.data as PlanEntity).status)"
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
  AButton, APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { PlanDetail, PlanEditor } from './component'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PlanStatusEnum } from '@/model/mes/plan/PlanStatusEnum'

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
