<template>
  <APanel>
    <AToolBar
      :entity="BomEntity"
      :loading="isLoading"
      :service="BomService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-delete="row => row.isPublished"
      :disable-edit="row => row.isPublished"
      :entity="BomEntity"
      show-detail
      @on-detail="onDetail"
      @on-delete="onDelete"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-select="onSelected"
    >
      <template #customRow="{ data }">
        <PublishButton
          :data
          @click="onPublish"
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
} from '@/airpower/component'
import { BomDetail, BomEditor } from './component'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { useTable } from '@/hook/useTable'
import PublishButton from '@/component/PublishButton.vue'

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onSortChanged,
  onSelected,
  onPageChanged,
  onDetail,
  onDelete,
  onPublish,
} = useTable(BomEntity, BomService, {
  editView: BomEditor,
  detailView: BomDetail,
})
</script>
<style lang="scss" scoped></style>
