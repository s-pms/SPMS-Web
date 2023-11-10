<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SaleEntity"
      :service="SaleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SaleEntity"
      :select-list="selectList"
      :disable-edit="(row: SaleEntity) => row.status !== SaleStatus.AUDITING"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #customerCode="row">
        {{ (row.data as SaleEntity).customer.code }}
      </template>
      <template #customerName="row">
        {{ (row.data as SaleEntity).customer.name }}
      </template>
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          @click="onConfirm(row.data)"
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
import { useAirTable } from '@/airpower/hook/useAirTable'
import { SaleDetail, SaleEditor } from './component'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleStatus } from '@/model/channel/sale/SaleStatus'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onReloadData, onDetail,
} = useAirTable(SaleEntity, SaleService, {
  editView: SaleEditor,
  detailView: SaleDetail,
})

async function onConfirm(row: SaleEntity) {
  await AirConfirm.warning(`是否确认审核选择的${SaleEntity.getClassName()}？`)
  await SaleService.create(isLoading).audit(row)
  onReloadData()
}
</script>
<style scoped lang="scss"></style>
