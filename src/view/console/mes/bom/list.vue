<template>
  <APanel>
    <AToolBar
      :entity="BomEntity"
      :loading="isLoading"
      :service="BomService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-edit="row => BomStatusEnum.REJECTED.notEqualsKey(row.status)"
      :entity="BomEntity"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
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

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { BomDetail, BomEditor } from './component'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { BomStatusEnum } from '@/model/mes/bom/BomStatusEnum'
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onSortChanged,
  onSelected,
  onPageChanged,
  onDetail,
  onAudit,
  onReject,
} = useBillTable(BomEntity, BomService, {
  editView: BomEditor,
  detailView: BomDetail,
})
</script>
<style lang="scss" scoped></style>
