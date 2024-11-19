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
      :disable-edit="row => InputStatusEnum.REJECTED.notEqualsKey(row.status)"
      hide-delete
      show-detail
      :ctrl-width="200"
      @on-detail="onDetail"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #storageName="{ data }">
        {{ data.storage?.name || "-" }}({{ data.storage?.code || "-" }})
      </template>
      <template #customRow="{ data }">
        <BillAuditOrReject
          :bill="data"
          @on-audit="onAudit"
          @on-reject="onReject"
        />
        <AButton
          link-button
          tooltip="完成"
          type="CHECKIN"
          :disabled="InputStatusEnum.INPUTTING.notEqualsKey(data.status)"
          @click="onFinish(data)"
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
import { BillAuditOrReject } from '@/component'

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
