<script lang="ts" setup>
import { BillAuditOrReject } from '@/component'
import { useBillTable } from '@/hook/billTable/useBillTable'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { InputService } from '@/model/wms/input/InputService'
import { InputStatusEnum } from '@/model/wms/input/InputStatusEnum'
import { APage, APanel, ATable } from '@airpower/web'
import { InputDetail, InputEditor } from './component'

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
} = useBillTable(InputService, {
  editView: InputEditor,
  detailView: InputDetail,
})
</script>

<template>
  <APanel title="">
    <AToolBar
      :entity="InputEntity"
      :loading="isLoading"
      :service="InputService"
      show-filter
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-edit="(row) => !InputStatusEnum.REJECTED.equalsKey(row.status)"
      :entity="InputEntity"
      :select-list="selectList"
      ctrl-width="200"
      hide-delete
      show-detail
      @on-detail="onDetail"
      @edit="onEdit"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
    >
      <template #storageName="{ data }">
        {{ data.storage?.name || '-' }}({{ data.storage?.code || '-' }})
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
