<template>
  <APanel>
    <AToolBar
      :entity="ConfigEntity"
      :loading="isLoading"
      :service="ConfigService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="90"
      :data-list="response.list"
      :disable-delete="row => row.isSystem"
      :entity="ConfigEntity"
      @on-edit="onEdit"
      @on-sort="onSortChanged"
      @on-delete="onDelete"
    />
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
import { useAirTable } from '@/airpower/hook/useAirTable'
import { ConfigEntity } from '@/model/system/config/ConfigEntity'
import { ConfigService } from '@/model/system/config/ConfigService'
import { ConfigurationEditor } from '@/view/console/system/config/component'

const {
  isLoading,
  response,
  onSearch,
  onEdit,
  onAdd,
  onPageChanged,
  onSortChanged,
  onDelete,
} = useAirTable(ConfigEntity, ConfigService, {
  editView: ConfigurationEditor,
})

</script>
<style lang="scss" scoped></style>
