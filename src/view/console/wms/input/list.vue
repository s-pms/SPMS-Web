<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="InputEntity"
      :service="InputService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="InputEntity"
      :select-list="selectList"
      :disable-edit="(row: InputEntity) => row.status !== InputStatus.REJECTED"
      hide-delete
      show-detail
      :ctrl-width="130"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #storageCode="row">
        {{ (row.data as InputEntity).storage.code }}
      </template>
      <template #storageName="row">
        {{ (row.data as InputEntity).storage.name }}
      </template>
      <template #customRow="row">
        <AButton
          icon-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="(row.data as InputEntity).status !== InputStatus.AUDITING"
          @click="onAudit(row.data)"
        />
        <AButton
          icon-button
          tooltip="驳回"
          type="LOCK"
          :disabled="(row.data as InputEntity).status !== InputStatus.AUDITING"
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
import { InputDetail, InputEditor } from './component'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputStatus } from '@/model/wms/input/InputStatus'
import { useBillTable } from '@/hook/billTable/useBillTable'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject,
} = useBillTable(InputEntity, InputService, {
  editView: InputEditor,
  detailView: InputDetail,
})
</script>
<style scoped lang="scss"></style>
