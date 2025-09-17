<script lang="ts" setup>
import type { OpenLogEntity } from '@/model/open/log/OpenLogEntity'

import { useMyTable } from '@/hook/useMyTable'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenLogService } from '@/model/open/log/OpenLogService'
import { ADialog, ATable, DialogProps, DialogUtil } from '@airpower/web'
import { OpenAppLogDetail } from './index'

const props = defineProps(DialogProps.withParam(new OpenAppEntity()))

const hook = useMyTable(OpenLogService, {
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
      :on-detail="onDetail"
      :use-hook="hook"
      ctrl-width="100"
      hide-delete
      hide-edit
      show-detail
    >
      <template #mSecond="{ data }">
        {{ data.updateTime - data.createTime }}ms
      </template>
    </ATable>
  </ADialog>
</template>

<style lang="scss" scoped></style>
