<template>
  <APanel>
    <AToolBar
      :entity="RoutingEntity"
      :loading="isLoading"
      :service="RoutingService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="160"
      :data-list="response.list"
      :disable-delete="row => row.isPublished"
      :disable-edit="row => row.isPublished"
      :entity="RoutingEntity"
      @on-edit="onEdit"
      @on-delete="onDelete"
    >
      <template #materialCode="{ data }">
        {{ data.material.code }}
      </template>
      <template #materialName="{ data }">
        {{ data.material.name }}
      </template>
      <template #bomCode="{ data }">
        {{ data.bom?.code || '-' }}
      </template>
      <template #bomName="{ data }">
        {{ data.bom?.name || '-' }}
      </template>
      <template #customRow="{ data }">
        <PublishButton
          :data
          @click="onPublish"
        />
        <AButton
          link-button
          @click="onProgress(data)"
        >
          流程
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
import { RoutingEditor, RoutingProgress } from './component'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import PublishButton from '@/component/PublishButton.vue'
import { useTable } from '@/hook/useTable'
import { AirDialog } from '@/airpower/helper/AirDialog'

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onPageChanged,
  onPublish,
} = useTable(RoutingEntity, RoutingService, {
  editView: RoutingEditor,
})

async function onProgress(data: RoutingEntity) {
  await AirDialog.show(RoutingProgress, data)
}
</script>
<style lang="scss" scoped></style>
