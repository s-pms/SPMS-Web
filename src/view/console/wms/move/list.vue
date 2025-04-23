<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { MoveDetail, MoveEditor } from './component'

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
} = useBillTable(MoveService, {
  editView: MoveEditor,
  detailView: MoveDetail,
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="MoveEntity"
      :loading="isLoading"
      :service="MoveService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => !MoveStatusEnum.REJECTED.equalsKey(row.status)"
      :entity="MoveEntity"
      :select-list="selectList"
      ctrl-width="160"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @edit="onEdit"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
      <template #storageName="{ data }">
        {{ data.storage.name }}({{ data.storage.code }})
      </template>
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

<style lang="scss" scoped></style>
