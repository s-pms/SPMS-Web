<template>
  <ADialog
    :title="currentLabel || param.label + '历史(最多500条记录)'"
    hide-confirm
    width="65%"
    height="50%"
    hide-footer
    @on-cancel="onCancel()"
    @on-full="onFull()"
  >
    <div class="filter">
      <div class="left" />
      <div class="right">
        <el-date-picker
          v-model="dateTimeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          :shortcuts="shortcuts"
          @change="validDateTimeRange"
        />

        <el-dropdown
          v-if="ParameterTypeEnum.QUANTITY.equalsKey(param.dataType)"
          trigger="click"
          @command="handleCommand"
        >
          <el-button type="primary">
            {{ CollectionGranularityEnum.getLabel(currentGranularity.key) }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in CollectionGranularityEnum.toDictionary()"
                :key="item.key"
                :command="item.key"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div
      v-if="ParameterTypeEnum.QUANTITY.equalsKey(param.dataType)"
      v-loading="isLoading"
      class="view"
    >
      <div
        id="echart"
        class="echart"
      />
    </div>
    <template v-else-if="collectionList.length > 3 && dictionary.length > 0">
      <div
        v-loading="isLoading"
        class="view"
      >
        <div class="status-list">
          <div
            v-for="item in dictionary"
            :key="(item.key as number)"
            class="item"
          >
            <div
              class="card"
              :style="{ backgroundColor: getColor(item) }"
            >
              <div class="quantity">
                {{
                  getFriendlyTime(parseInt(((collectionList[collectionList.length - 1].timestamp -
                    collectionList[0].timestamp) *
                    getPercent(item) / 100).toString()))
                }}
              </div>
              <div class="percent">
                {{ getPercent(item) }}%
              </div>
              <div class="label">
                {{ getLabel(item) }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="cover"
          :style="{ backgroundColor: currentColor || 'transparent' }"
        />
      </div>
      <div class="timeline">
        <div class="line">
          <div
            v-for="(item, index) in statusList"
            :key="index"
            class="item"
            :style="{ backgroundColor: item.color, width: item.percent + '%' }"
            @mouseenter="currentLabel = item.label; currentColor = item.color"
            @mouseout="currentLabel = ''; currentColor = ''"
          />
        </div>
        <div class="time">
          <div class="left">
            {{ AirDateTime.formatFromMilliSecond(collectionList[0].timestamp) }}
          </div>
          <div
            v-if="collectionList.length < maxLength"
            class="right"
          >
            {{ AirDateTime.formatFromMilliSecond(collectionList[collectionList.length - 1].timestamp) }}
          </div>
          <div
            v-else
            class="right"
          >
            仅最近{{ maxLength }}条数据, 可尝试缩小时间范围
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="collectionList.length > 0">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in collectionList"
            :key="index"
            :icon="Clock"
          >
            <h3>{{ item.strValue }}</h3>
            <div class="time-icon">
              <el-icon>
                <Clock />
              </el-icon>
              {{ AirDateTime.formatFromMilliSecond(item.timestamp) }}
            </div>
          </el-timeline-item>
        </el-timeline>

        <div class="more-data">
          仅展示前{{ maxLength }}条, 可筛选后查看指定时间段的数据
        </div>
      </template>
      <AEmpty v-else>
        没有查询到相关历史信息
      </AEmpty>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ArrowDown, Clock } from '@element-plus/icons-vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as echarts from 'echarts'
import { ADialog, AEmpty } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { CollectionGranularityEnum } from '@/model/iot/collection/CollectionGranularityEnum'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { DeviceStatusEnum } from '@/model/asset/device/DeviceStatusEnum'
import { AirColor } from '@/airpower/enum/AirColor'
import { IDictionary } from '@/airpower/interface/IDictionary'
import { AirRand } from '@/airpower/helper/AirRand'
import { IJson } from '@/airpower/interface/IJson'
import { AlarmStatusEnum } from '@/model/asset/device/AlarmStatusEnum'
import { ParameterTypeEnum } from '@/model/iot/parameter/ParameterTypeEnum'

const currentLabel = ref('')
const currentColor = ref('')
const props = defineProps(airPropsParam(new CollectionEntity()))

const collectionList = ref([] as CollectionEntity[])

const isLoading = ref(false)

const maxLength = 500

const SECOND_PER_DAY = 86400
const SECOND_PER_HOUR = 3600
const currentGranularity = ref(CollectionGranularityEnum.ONE_MINUTE)
const dateTimeRange = ref([new Date(AirDateTime.getMilliTimeStamps() - SECOND_PER_HOUR * 6 * 1000), new Date()] as Date[])

const shortcuts = [
  {
    text: '近一小时',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000)
      return [start, end]
    },
  },
  {
    text: '近三小时',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 3)
      return [start, end]
    },
  },
  {
    text: '近六小时',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 6)
      return [start, end]
    },
  },
  {
    text: '近半天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 12)
      return [start, end]
    },
  },
  {
    text: '近一天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    },
  },
  {
    text: '近三天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
      return [start, end]
    },
  },
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
      return [start, end]
    },
  },
  {
    text: '近一季度',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31 * 3)
      return [start, end]
    },
  },
  {
    text: '近半年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31 * 6)
      return [start, end]
    },
  },
  {
    text: '近一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 31 * 12)
      return [start, end]
    },
  },
]

const dictionary = computed(() => {
  switch (props.param.code) {
    case 'Status':
      return DeviceStatusEnum.toDictionary().filter((item) => item.key !== DeviceStatusEnum.UNKNOWN.key)
    case 'Alarm':
      return AlarmStatusEnum.toDictionary()
    default:
  }
  return []
})

/**
 * 处理时间区间是否合理
 */
function validDateTimeRange() {
  if (dateTimeRange.value && dateTimeRange.value.length === 2) {
    switch (props.param.dataType) {
      case ParameterTypeEnum.QUANTITY.key:
        switch (currentGranularity.value) {
          case CollectionGranularityEnum.ONE_MINUTE:
            // 每分钟 最多允许查看最近6小时
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > 6 * SECOND_PER_HOUR) {
              AirNotification.warning('该时间粒度下最多允许查看6小时内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - 6 * SECOND_PER_HOUR) * 1000)
            }
            break
          case CollectionGranularityEnum.FIVE_MINUTES:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY) {
              AirNotification.warning('该时间粒度下最多允许查看24小时内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY) * 1000)
            }
            break
          case CollectionGranularityEnum.THIRTY_MINUTES:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY * 3) {
              AirNotification.warning('该时间粒度下最多允许查看72小时内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY * 3) * 1000)
            }
            break
          case CollectionGranularityEnum.ONE_HOUR:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY * 7) {
              AirNotification.warning('该时间粒度下最多允许查看7天内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY * 7) * 1000)
            }
            break
          case CollectionGranularityEnum.ONE_DAY:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY * 365) {
              AirNotification.warning('该时间粒度下最多允许查看一年内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY * 365) * 1000)
            }
            break
          case CollectionGranularityEnum.ONE_WEEK:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY * 365 * 3) {
              AirNotification.warning('该时间粒度下最多允许查看三年内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY * 365 * 3) * 1000)
            }
            break
          case CollectionGranularityEnum.ONE_MONTH:
            if (AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - AirDateTime.getUnixTimeStamps(dateTimeRange.value[0]) > SECOND_PER_DAY * 365 * 10) {
              AirNotification.warning('该时间粒度下最多允许查看十年内的数据')
              dateTimeRange.value[0] = new Date((AirDateTime.getUnixTimeStamps(dateTimeRange.value[1]) - SECOND_PER_DAY * 365 * 10) * 1000)
            }
            break
          default:
        }
        break
      default:
    }
  } else {
    dateTimeRange.value = [new Date(AirDateTime.getMilliTimeStamps() - SECOND_PER_HOUR * 6 * 1000), new Date()] as Date[]
    currentGranularity.value = CollectionGranularityEnum.ONE_MINUTE
  }
  // eslint-disable-next-line no-use-before-define
  getDevicePayloadHistory()
}

/**
 * 获取采集数据的颜色
 * @param item 采集数据
 */
function getStatusColor(item: CollectionEntity) {
  switch (props.param.code) {
    case 'Status':
      return DeviceStatusEnum.getColor(item.intValue, AirColor.NORMAL)
    case 'Alarm':
      return AlarmStatusEnum.getColor(item.intValue, AirColor.NORMAL)
    default:
  }
  return AirColor.NORMAL
}

/**
 * 获取采集数据的显示文案
 * @param item 采集数据
 * @param index 循环索引
 */
function getStatusLabel(item: CollectionEntity, index: number) {
  if (index === 0 || collectionList.value.length < 3) {
    return ''
  }
  let label = ''
  switch (props.param.code) {
    case 'Status':
      label = DeviceStatusEnum.getLabel(item.intValue)
      label += ' [ '
      label += AirDateTime.formatFromMilliSecond(collectionList.value[index - 1].timestamp)
      label += ' ~ '
      label += AirDateTime.formatFromMilliSecond(item.timestamp)
      label += ' ]'
      return label
    case 'Alarm':
      label = AlarmStatusEnum.getLabel(item.intValue)
      label += ' [ '
      label += AirDateTime.formatFromMilliSecond(collectionList.value[index - 1].timestamp)
      label += ' ~ '
      label += AirDateTime.formatFromMilliSecond(item.timestamp)
      label += ' ]'
      return label
    default:
  }
  return item.intValue
}

/**
 * 采集数据指定状态的百分比
 * @param item 采集数据
 * @param index 循环索引
 */
function getStatusPercent(item: CollectionEntity, index: number) {
  if (index === 0 || collectionList.value.length < 3) {
    return 0
  }
  let startTime = collectionList.value[0].timestamp
  if (index > 0) {
    startTime = collectionList.value[index - 1].timestamp
  }
  return parseFloat(((
    (item.timestamp - startTime)
      / (collectionList.value[collectionList.value.length - 1].timestamp - collectionList.value[0].timestamp)) * 100).toString()).toFixed(6)
}

/**
 * 采集数据的状态列表
 */
const statusList = computed(() => {
  const arr: IJson[] = []
  if (collectionList.value.length < 3) {
    return arr
  }
  collectionList.value.forEach((item, index) => {
    arr.push({
      key: item.intValue,
      color: getStatusColor(item),
      label: getStatusLabel(item, index),
      percent: getStatusPercent(item, index),
    })
  })
  return arr
})

function getLabel(item: IDictionary) {
  return dictionary.value.find((i) => i.key === item.key)?.label || '未知'
}

function getColor(item: IDictionary) {
  return dictionary.value.find((i) => i.key === item.key)?.color || `#${AirRand.getRandNumber(10, 99)}${AirRand.getRandNumber(10, 99)}${AirRand.getRandNumber(10, 99)}`
}

function getPercent(dictionary: IDictionary) {
  let percent = 0
  statusList.value.forEach((item) => {
    if (dictionary.key === item.key) {
      percent += parseFloat(item.percent)
    }
  })
  return parseFloat(parseFloat(percent.toString()).toFixed(2))
}

function getFriendlyTime(milSecond: number) {
  const s = parseInt((milSecond / 1000).toString(), 10)
  const arr: string[] = []
  const hour = parseInt((s / 3600).toString(), 10)
  if (hour > 0) {
    arr.push(`${hour}h`)
  }
  const minute = parseInt(((s % 3600) / 60).toString(), 10)
  if (minute > 0) {
    arr.push(`${minute}m`)
  }
  const second = s % 60
  arr.push(`${second}s`)
  return arr.join(' ')
}

function handleCommand(cmd: string) {
  currentGranularity.value = CollectionGranularityEnum.get(parseInt(cmd, 10)) as CollectionGranularityEnum
  validDateTimeRange()
}

let myChart: echarts.ECharts

function initLine() {
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

function loadData() {
  switch (props.param.dataType) {
    case ParameterTypeEnum.QUANTITY.key:
      myChart = echarts.init(document.getElementById('echart'))
      initLine()
      break
    default:
  }
}

async function getDevicePayloadHistory() {
  if (dateTimeRange.value.length !== 2) {
    AirNotification.warning('请选择查看的历史周期')
    return
  }
  const postData = props.param.copy()
  postData.reportGranularity = currentGranularity.value.key
  postData.startTime = AirDateTime.getMilliTimeStamps(dateTimeRange.value[0])
  postData.endTime = AirDateTime.getMilliTimeStamps(dateTimeRange.value[1])
  const list = await DeviceService.create(isLoading).getDevicePayloadHistory(postData)
  if (ParameterTypeEnum.INFORMATION.equalsKey(props.param.dataType)) {
    collectionList.value = list.reverse()
  } else {
    collectionList.value = list
  }
  loadData()
}

onMounted(() => {
  getDevicePayloadHistory()
})

function onFull() {
  setTimeout(() => {
    myChart.dispose()
    loadData()
  }, 500)
}
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .left {
    flex: 1;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;

    > div {
      margin-left: 5px;
    }
  }
}

.view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .echart {
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .status-list {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .item {
      .card {
        margin: 20px;
        border-radius: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 150px;
        color: white;
        text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.8);
        position: relative;
        overflow: hidden;

        .quantity {
          font-size: 16px;
        }

        .percent {
          font-size: 32px;
          font-weight: bold;
        }

        .label {
          font-size: 12px;
          background-color: #333;
          box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
          padding: 50px 50px 2px;
          position: absolute;
          right: -60px;
          top: -30px;
          transform: rotateZ(45deg);
        }
      }
    }
  }

  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.3;
  }
}

.el-timeline {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  height: 0;
}

.time-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #999;

  .el-icon {
    margin-right: 3px;
    font-size: 16px;
  }
}

.more-data {
  background-color: #ccc;
  color: #333;
  font-size: 12px;
  border-radius: 3px;
  padding: 5px 10px;
}

.timeline {
  .line {
    height: 20px;

    .item {
      height: 100%;
      display: inline-block;
      cursor: pointer;
    }
  }

  .time {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    > div {
      flex: 1;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }

    .left {
      text-align: left;
    }

    .right {
      text-align: right;
    }
  }
}
</style>
