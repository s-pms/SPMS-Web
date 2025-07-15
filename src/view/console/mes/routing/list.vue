<script lang="ts" setup>
import type { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { AButton, APanel, ATable, DialogUtil } from '@airpower/web'
import PublishButton from '@/component/PublishButton.vue'
import { useMyTable } from '@/hook/useMyTable'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { RoutingEditor, RoutingProgress } from './component'

const hook = useMyTable(RoutingService, {
  editView: RoutingEditor,
})

async function onProgress(data: RoutingEntity) {
  await DialogUtil.show(RoutingProgress, data)
}
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.isPublished"
      :disable-edit="(row) => row.isPublished"
      :use-hook="hook"
      ctrl-width="160"
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
        <PublishButton :data @click="hook.onPublish" />
        <AButton link @click="onProgress(data)">
          流程
        </AButton>
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
