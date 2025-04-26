<script lang="ts" setup>
import { Constant } from '@/config/Constant'
import { useMyTable } from '@/hook/useMyTable'
import { ConfigEntity } from '@/model/system/config/ConfigEntity'
import { ConfigService } from '@/model/system/config/ConfigService'
import { ConfigType } from '@/model/system/config/ConfigType'
import { ConfigurationEditor } from '@/view/console/system/config/component'

import { APage, APanel, ATable } from '@airpower/web'

const {
  isLoading,
  response,
  onSearch,
  onEdit,
  onAdd,
  onPageChanged,
  onSortChanged,
  onDelete,
} = useMyTable(ConfigService, {
  editView: ConfigurationEditor,
})
</script>

<template>
  <APanel title="">
    <ATable
      v-loading="isLoading"
      hide-add
      :data-list="response.list"
      :disable-delete="(row) => row.isSystem"
      :entity="ConfigEntity"
      :service="ConfigService"
      ctrl-width="90"
      @add="onAdd"
      @delete="onDelete"
      @edit="onEdit"
      @search="onSearch"
      @sort-changed="onSortChanged"
    >
      <template #name="{ data }">
        <el-link v-tip="data.description">
          {{ data.name }}
        </el-link>
      </template>
      <template #config="{ data }">
        <template v-if="ConfigType.BOOLEAN.equalsKey(data.type)">
          <el-switch
            :model-value="data.config === Constant.BOOLEAN_YES"
            disabled
          />
        </template>
        <template v-else>
          {{ data.config }}
        </template>
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
