<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="OutputEntity"
      :service="OutputService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OutputEntity"
      :select-list="selectList"
      :disable-edit="(row: OutputEntity) => row.status !== OutputStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as OutputEntity).status !== OutputStatus.AUDITING"
          @click="onAudit(row.data)"
        />
        <AButton
          icon-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as OutputEntity).status !== OutputStatus.AUDITING"
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
import { OutputDetail, OutputEditor } from './component'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { OutputStatus } from '@/model/wms/output/OutputStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(OutputEntity, OutputService, {
  editView: OutputEditor,
  detailView: OutputDetail,
})
</script>
<style scoped lang="scss"></style>
