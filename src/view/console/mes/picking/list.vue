<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'
import { PickingStatusEnum } from '@/model/mes/picking/PickingStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { PickingDetail, PickingEditor } from './component'

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
} = useBillTable(PickingService, {
  editView: PickingEditor,
  detailView: PickingDetail,
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="PickingEntity"
      :loading="isLoading"
      :service="PickingService"
      show-filter
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => row.status !== PickingStatusEnum.REJECTED.key"
      :entity="PickingEntity"
      :select-list="selectList"
      ctrl-width="160"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @edit="onEdit"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
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
