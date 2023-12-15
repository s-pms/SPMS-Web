<template>
  <ADialog
    :title="param.label + '历史'"
    hide-confirm
    width="65%"
    height="50%"
    @on-cancel="onCancel()"
    @on-full="onFull()"
  >
    <div class="filter">
      <div class="left">
        <el-select
          v-model="currentGranularity"
          @change="getDevicePayloadHistory()"
        >
          <el-option
            v-for="item in CollectionGranularityDictionary"
            :key="item.key"
            :value="item.key"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </div>
      <div class="right">
        <el-date-picker
          v-model="dateTimeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="X"
        />
      </div>
    </div>
    <div
      v-loading="isLoading"
      class="view"
    >
      <div
        id="line"
        class="echart"
      />
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as echarts from 'echarts'
import { ADialog } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { CollectionGranularity } from '@/model/iot/collection/CollectionGranularity'
import { CollectionGranularityDictionary } from '@/model/iot/collection/CollectionGranularityDictionary'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new CollectionEntity()))

const collectionList = ref([] as CollectionEntity[])

const isLoading = ref(false)

const currentGranularity = ref(CollectionGranularity.ONE_MINUTE)
const dateTimeRange = ref([] as string[])

watch(currentGranularity, () => {
  if (dateTimeRange.value.length === 2) {
    switch (currentGranularity.value) {
      case CollectionGranularity.ONE_MINUTE:
        // 每分钟 最多允许查看最近6小时
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 6 * 60) {
          AirNotification.warning('该时间粒度下最多允许查看6小时内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 6 * 60) - 86400).toString()
        }
        break
      case CollectionGranularity.FIVE_MINUTES:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60) {
          AirNotification.warning('该时间粒度下最多允许查看24小时内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60).toString()
        }
        break
      case CollectionGranularity.THIRTY_MINUTES:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60 * 3) {
          AirNotification.warning('该时间粒度下最多允许查看72小时内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60 * 3).toString()
        }
        break
      case CollectionGranularity.ONE_HOUR:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60 * 7) {
          AirNotification.warning('该时间粒度下最多允许查看7天内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60 * 7).toString()
        }
        break
      case CollectionGranularity.ONE_DAY:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60 * 365) {
          AirNotification.warning('该时间粒度下最多允许查看一年内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60 * 365).toString()
        }
        break
      case CollectionGranularity.ONE_WEEK:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60 * 365 * 3) {
          AirNotification.warning('该时间粒度下最多允许查看三年内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60 * 365 * 3).toString()
        }
        break
      case CollectionGranularity.ONE_MONTH:
        if (parseInt(dateTimeRange.value[1], 10) - parseInt(dateTimeRange.value[0], 10) > 24 * 60 * 365 * 10) {
          AirNotification.warning('该时间粒度下最多允许查看十年内的数据')
          dateTimeRange.value[0] = (parseInt(dateTimeRange.value[1], 10) - 24 * 60 * 365 * 10).toString()
        }
        break
      default:
    }
  }
})

const defaultDateRange = ref([new Date(AirDateTime.getUnixTimeStamps() - 3600 * 6 * 1000), new Date()] as Date[])

let myChart: echarts.ECharts
function initLine() {
  myChart = echarts.init(document.getElementById('line'))
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '2%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
        },
        data: collectionList.value.map((item) => AirDateTime.formatFromMilliSecond(item.timestamp, AirDateTimeFormatter.MM_DD_HH_mm)),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: props.param.label,
        type: 'line',
        itemStyle: {
          color: 'rgb(1, 191, 236)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
        smooth: true,
        data: collectionList.value.map((item) => parseFloat(item.value).toFixed(2)),
      },
    ],
  }
  myChart.setOption(option)
}

async function getDevicePayloadHistory() {
  const postData = props.param.copy()
  postData.reportGranularity = currentGranularity.value
  collectionList.value = await DeviceService.create(isLoading).getDevicePayloadHistory(postData)
  initLine()
}

onMounted(() => {
  getDevicePayloadHistory()
})

function onFull() {
  setTimeout(() => {
    myChart.dispose()
    initLine()
  }, 500)
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: row;
  align-items: center;

  .left {
    flex: 1;
  }
}

.view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .echart {
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
