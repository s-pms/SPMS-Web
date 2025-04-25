<script lang="ts" setup>
import PublishButton from '@/component/PublishButton.vue'
import { useMyTable } from '@/hook/useMyTable'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { APage, APanel, ATable } from '@airpower/web'
import { BomDetail, BomEditor } from './component'

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
} = useMyTable(BomService, {
  editView: BomEditor,
  detailView: BomDetail,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="(row) => row.isPublished"
      :disable-edit="(row) => row.isPublished"
      :entity="BomEntity"
      :service="BomService"
      ctrl-width="160"
      show-detail
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @on-detail="onDetail"
      @sort-changed="onSortChanged"
      @select-changed="onSelected"
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

<style lang="scss" scoped></style>
