<script lang="ts" setup>
import PublishButton from '@/component/PublishButton.vue'
import { useMyTable } from '@/hook/useMyTable'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { AButton, APage, APanel, ATable, DialogUtil } from '@airpower/web'
import { RoutingEditor, RoutingProgress } from './component'

const {
  isLoading,
  response,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onPageChanged,
  onPublish,
} = useMyTable(RoutingService, {
  editView: RoutingEditor,
})

async function onProgress(data: RoutingEntity) {
  await DialogUtil.show(RoutingProgress, data)
}
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="(row) => row.isPublished"
      :disable-edit="(row) => row.isPublished"
      :entity="RoutingEntity"
      :service="RoutingService"
      ctrl-width="160"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
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
          link
          @click="onProgress(data)"
        >
          流程
        </AButton>
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
