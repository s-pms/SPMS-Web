<template>
  <APanel>
    <AToolBar
      :entity="MoveEntity"
      :loading="isLoading"
      :service="MoveService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-edit="row => MoveStatusEnum.REJECTED.notEqualsKey(row.status)"
      :entity="MoveEntity"
      :select-list="selectList"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
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

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@airpower/component'
import { MoveDetail, MoveEditor } from './component'
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { MoveStatusEnum } from '@/model/wms/move/MoveStatusEnum'
import { BillAuditOrReject } from '@/component'

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
} = useBillTable(MoveEntity, MoveService, {
  editView: MoveEditor,
  detailView: MoveDetail,
})
</script>
<style lang="scss" scoped></style>
