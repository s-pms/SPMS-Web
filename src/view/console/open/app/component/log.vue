<script lang="ts" setup>
import { useMyTable } from '@/hook/useMyTable'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { OpenLogEntity } from '@/model/open/log/OpenLogEntity'

import { OpenLogService } from '@/model/open/log/OpenLogService'
import { ADialog, APage, ATable, DialogProps, DialogUtil, useDetail } from '@airpower/web'
import { OpenAppLogDetail } from './index'

const props = defineProps(DialogProps.withParam(new OpenAppEntity()))

const {
  isLoading,
} = useDetail(props, OpenAppService)

const {
  onPageChanged,
  response,
} = useMyTable(OpenLogService, {
  beforeSearch(requestData) {
    requestData.filter.openApp = props.param.copy().expose('id')
    return requestData
  },
})

function onDetail(log: OpenLogEntity) {
  DialogUtil.show(OpenAppLogDetail, log)
}
</script>

<template>
  <ADialog
    height="80%"
    title="请求日志"
    width="80%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="OpenLogEntity"
      ctrl-width="100"
      hide-delete
      hide-edit
      show-detail
      @detail="onDetail"
    >
      <template #mSecond="{ data }">
        {{ data.updateTime - data.createTime }}ms
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<style lang="scss" scoped></style>
