<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="MoveEntity"
      :service="MoveService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="MoveEntity"
      :select-list="selectList"
      :disable-edit="(row: MoveEntity) => row.status !== MoveStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #fromStorageCode="row">
        {{ (row.data as MoveEntity).fromStorage.code }}
      </template>
      <template #fromStorageName="row">
        {{ (row.data as MoveEntity).fromStorage.name }}
      </template>
      <template #toStorageCode="row">
        {{ (row.data as MoveEntity).toStorage.code }}
      </template>
      <template #toStorageName="row">
        {{ (row.data as MoveEntity).toStorage.name }}
      </template>
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as MoveEntity).status !== MoveStatus.AUDITING"
          @click="onAudit(row.data)"
        />
        <AButton
          icon-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as MoveEntity).status !== MoveStatus.AUDITING"
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
import { MoveDetail, MoveEditor } from './component'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { MoveStatus } from '@/model/wms/move/MoveStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(MoveEntity, MoveService, {
  editView: MoveEditor,
  detailView: MoveDetail,
})
</script>
<style scoped lang="scss"></style>
