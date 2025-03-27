<template>
  <ADialog
    height="80%"
    title="请求日志"
    width="80%"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
  >
    <ATable
      v-loading="isLoading"
      :ctrl-width="100"
      :data-list="response.list"
      :entity="OpenLogEntity"
      hide-delete
      hide-edit
      show-detail
      @on-detail="onDetail"
    >
      <template #mSecond="{ data }">
        {{ data.updateTime - data.createTime }}ms
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, APage, ATable } from '@airpower/component'
import { useAirDetail } from '@airpower/hook/useAirDetail'
import { airPropsParam } from '@airpower/config/AirProps'
import { useAirTable } from '@airpower/hook/useAirTable'
import { AirDialog } from '@airpower/helper/AirDialog'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { OpenLogEntity } from '@/model/open/log/OpenLogEntity'
import { OpenLogService } from '@/model/open/log/OpenLogService'
import { OpenAppLogDetail } from './index'

const props = defineProps(airPropsParam(new OpenAppEntity()))

const { isLoading } = useAirDetail(props, OpenAppEntity, OpenAppService)

const {
  onPageChanged,
  response,
} = useAirTable(OpenLogEntity, OpenLogService, {
  beforeSearch(requestData) {
    requestData.filter.openApp = props.param.copyExposeId()
    return requestData
  },
})

function onDetail(log: OpenLogEntity) {
  AirDialog.show(OpenAppLogDetail, log)
}
</script>
<style lang="scss" scoped></style>
