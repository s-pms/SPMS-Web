<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="InputEntity"
      :service="InputService"
      show-filter
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="InputEntity"
      :select-list="selectList"
      :disable-edit="(row: InputEntity) => InputStatusEnum.REJECTED.notEqualsKey(row.status)"
      hide-delete
      show-detail
      :ctrl-width="180"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #storageName="row">
        {{ (row.data as InputEntity).storage?.name || "-" }}({{ (row.data as InputEntity).storage?.code || "-" }})
      </template>
      <template #customRow="row">
        <AButton
          link-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="InputStatusEnum.AUDITING.notEqualsKey((row.data as InputEntity).status)"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="InputStatusEnum.AUDITING.notEqualsKey((row.data as InputEntity).status)"
          @click="onReject(row.data)"
        >
          驳回
        </AButton>
        <AButton
          link-button
          tooltip="完成"
          type="CHECKIN"
          :disabled="InputStatusEnum.INPUTTING.notEqualsKey((row.data as InputEntity).status)"
          @click="onFinish(row.data)"
        >
          完成
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
import { InputDetail, InputEditor } from './component'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { InputStatusEnum } from '@/model/wms/input/InputStatusEnum'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onEdit, onPageChanged, onSortChanged, onSelected, onDetail, onAudit, onReject, onFinish,
} = useBillTable(InputEntity, InputService, {
  editView: InputEditor,
  detailView: InputDetail,
})
</script>
<style scoped lang="scss"></style>
