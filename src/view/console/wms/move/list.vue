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
      :disable-edit="(row: MoveEntity) => MoveStatusEnum.REJECTED.notEqualsKey(row.status)"
      hide-delete
      show-detail
      :ctrl-width="160"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
    >
      <template #storageName="row">
        {{ (row.data as MoveEntity).storage.name }}({{ (row.data as MoveEntity).storage.code }})
      </template>
      <template #customRow="row">
        <AButton
          link-button
          tooltip="审核"
          type="CONFIRM"
          :disabled="MoveStatusEnum.AUDITING.notEqualsKey((row.data as MoveEntity).status)"
          @click="onAudit(row.data)"
        >
          审核
        </AButton>
        <AButton
          link-button
          tooltip="驳回"
          type="LOCK"
          :disabled="MoveStatusEnum.AUDITING.notEqualsKey((row.data as MoveEntity).status)"
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
import { MoveDetail, MoveEditor } from './component'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'

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
