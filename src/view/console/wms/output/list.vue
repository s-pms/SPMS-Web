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
      :disable-edit="(row: OutputEntity) => OutputStatusEnum.REJECTED.notEqualsKey(row.status)"
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
          :disabled="OutputStatusEnum.AUDITING.notEqualsKey((row.data as OutputEntity).status)"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="OutputStatusEnum.AUDITING.notEqualsKey((row.data as OutputEntity).status)"
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
import { OutputDetail, OutputEditor } from './component'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import { OutputService } from '@/model/wms/output/OutputService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { OutputStatusEnum } from '@/model/wms/output/OutputStatusEnum'

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
