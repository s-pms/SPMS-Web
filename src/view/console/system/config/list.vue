<script lang="ts" setup>
import { AButton, APanel, ATable, FeedbackUtil } from '@airpower/web'
import { Constant } from '@/config/Constant'
import { useMyTable } from '@/hook/useMyTable'
import { ConfigService } from '@/model/system/config/ConfigService'

import { ConfigType } from '@/model/system/config/ConfigType'
import { ConfigurationEditor } from '@/view/console/system/config/component'

const hook = useMyTable(ConfigService, {
  editView: ConfigurationEditor,
})
</script>

<template>
  <APanel>
    <ATable
      :disable-delete="(row) => row.isSystem"
      :use-hook="hook"
      ctrl-width="90"
      hide-add
    >
      <template #name="{ data }">
        <AButton
          link
          @click="FeedbackUtil.toastInfo(data.description)"
        >
          {{ data.name }}
        </AButton>
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
  </APanel>
</template>

<style lang="scss" scoped></style>
