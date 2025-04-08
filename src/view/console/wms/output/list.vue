<script lang="ts" setup>
import {APage, APanel, ATable, AToolBar} from '@airpower/component'
import {OutputEntity} from '@/model/wms/output/OutputEntity'
import {OutputService} from '@/model/wms/output/OutputService'
import {OutputStatusEnum} from '@/model/wms/output/OutputStatusEnum'
import {BillAuditOrReject} from '@/component'
import {useBillTable} from "@/hook/billTable/useBillTable";
import {OutputDetail, OutputEditor} from "@/view/console/wms/output/component";


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
} = useBillTable(OutputService, {
  editView: OutputEditor,
  detailView: OutputDetail,
})
</script>
<template>
  <APanel>
    <AToolBar :entity="OutputEntity" :loading="isLoading" :service="OutputService" @on-add="onAdd"
              @on-search="onSearch"/>
    <ATable v-loading="isLoading" :ctrl-width="160" :data-list="response.list"
            :disable-edit="(row: OutputEntity) => OutputStatusEnum.REJECTED.notEqualsKey(row.status)"
            :entity="OutputEntity"
            :select-list="selectList" hide-delete show-detail @on-detail="onDetail" @on-edit="onEdit"
            @on-sort="onSortChanged"
            @on-select="onSelected">
      <template #customRow="{ data }">
        <BillAuditOrReject :bill="data" @on-audit="onAudit" @on-reject="onReject"/>
      </template>
    </ATable>
    <template #footerLeft>
      <APage :response="response" @on-change="onPageChanged"/>
    </template>
  </APanel>
</template>


<style lang="scss" scoped></style>

