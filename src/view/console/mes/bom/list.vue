<script lang="ts" setup>
import PublishButton from '@/component/PublishButton.vue'
import { useMyTable } from '@/hook/useMyTable'
import { BomService } from '@/model/mes/bom/BomService'
import { APanel, ATable } from '@airpower/web'
import { BomDetail, BomEditor } from './component'

const hook = useMyTable(BomService, {
  editView: BomEditor,
  detailView: BomDetail,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.isPublished"
      :disable-edit="(row) => row.isPublished"
      :use-hook="hook"
      ctrl-width="160"
      show-detail
    >
      <template #customRow="{ data }">
        <PublishButton :data @click="hook.onPublish" />
      </template>
    </ATable>
  </APanel>
</template>

<style lang="scss" scoped></style>
