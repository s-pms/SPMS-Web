<template>
  <ADialog
    :title="param.label + '历史'"
    hide-confirm
    width="65%"
    height="50%"
    @on-cancel="onCancel()"
    @on-full="onFull()"
  >
    <div class="view">
      <div
        id="line"
        class="echart"
      />
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as echarts from 'echarts'
import { ADialog } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'

const props = defineProps(airPropsParam(new CollectionEntity()))

const monitorList = ref([] as CollectionEntity[])
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
        data: monitorList.value.map((item) => AirDateTime.formatFromMilliSecond(item.timestamp, AirDateTimeFormatter.MM_DD_HH_mm)),
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
        data: monitorList.value.map((item) => parseFloat(item.value).toFixed(2)),
      },
    ],
  }
  myChart.setOption(option)
}

async function getDevicePayloadHistory() {
  monitorList.value = await DeviceService.create().getDevicePayloadHistory(props.param)
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
.view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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
