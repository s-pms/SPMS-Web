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
      :service="ConfigService"
      @add="onAdd"
      @search="onSearch"
      v-loading="isLoading"
      :data-list="response.list"
      :disable-delete="(row) => row.isSystem"
      :entity="ConfigEntity"
      ctrl-width="90"
      @edit="onEdit"
      @sort-changed="onSortChanged"
      @delete="onDelete"
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
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<style lang="scss" scoped></style>
