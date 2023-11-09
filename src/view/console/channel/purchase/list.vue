<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PurchaseEntity"
      :service="PurchaseService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="PurchaseEntity"
      :select-list="selectList"
      :disable-edit="(row: PurchaseEntity) => row.status !== PurchaseStatus.AUDITING"
      hide-delete
      :ctrl-width="105"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
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
import { PurchaseEditor } from './component'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseStatus } from '@/model/channel/purchase/PurchaseStatus'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onReloadData,
} = useAirTable(PurchaseEntity, PurchaseService, {
  editView: PurchaseEditor,
})

async function onConfirm(row: PurchaseEntity) {
  await AirConfirm.warning(`是否确认审核选择的${PurchaseEntity.getClassName()}？`)
  await PurchaseService.create(isLoading).audit(row)
  onReloadData()
}
</script>
<style scoped lang="scss"></style>
