<template>
  <ADialog
    :title="formData.name + '(' + formData.code + ') 采集实时监控'"
    hide-confirm
    width="70%"
    height="70%"
    @on-cancel="onCancel()"
  >
    <div
      v-if="monitorList.length > 0"
      class="monitor-list"
    >
      <div
        v-for="item in monitorList"
        :key="item.code"
        class="monitor-card"
      >
        <div
          class="card-body"
          @click="showHistory(item)"
        >
          <div class="head">
            <div class="title">
              {{ item.label }}
            </div>
            <div class="code">
              {{ item.code }}
            </div>
          </div>
          <div class="value">
            <div
              v-if="[CollectionDefault.ALARM.toString(), CollectionDefault.STATUS.toString()].includes(item.code)"
              class="light"
              :style="{ backgroundColor: getColor(item) }"
            />
            {{ getValue(item) }}
          </div>
        </div>
      </div>
    </div>
    <AEmpty v-else>
      暂无已添加的监控属性 <el-link @click="addParameter()">
        去添加
      </el-link>
    </AEmpty>
  </ADialog>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { ADialog, AEmpty } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { DeviceStatusDictionary } from '@/model/asset/device/DeviceStatusDictionary'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { ParameterEditor } from '@/view/console/iot/parameter/component'
import { CollectionDefault } from '@/model/iot/collection/CollectionDefault'
import { AlarmStatusDictionary } from '@/model/asset/device/AlarmStatusDictionary'
import { DeviceCollectHistory } from '.'

const props = defineProps(airPropsParam(new DeviceEntity()))

const formData = ref(props.param.copy())

const monitorList = ref([] as CollectionEntity[])

async function getDetail() {
  formData.value = await DeviceService.create().getDetail(props.param.id)
}

async function getCurrentReport() {
  monitorList.value = await DeviceService.create().getCurrentReport(props.param.id)
}

let timer = setInterval(() => { getCurrentReport() }, 1000)

onUnmounted(() => {
  clearInterval(timer)
})

getDetail()

function getValue(item: CollectionEntity) {
  switch (item.code) {
    case CollectionDefault.STATUS:
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.label || '-'
    case CollectionDefault.ALARM:
      return AlarmStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.label || '-'
    default:
      return item.value
  }
}

function getColor(item: CollectionEntity) {
  switch (item.code) {
    case CollectionDefault.STATUS:
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.color || '-'
    case CollectionDefault.ALARM:
      return AlarmStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.color || '-'
    default:
      return item.value
  }
}

function addParameter() {
  AirDialog.show(ParameterEditor)
}

async function showHistory(item: CollectionEntity) {
  item.uuid = props.param.uuid
  clearInterval(timer)
  try {
    await AirDialog.show(DeviceCollectHistory, item)
  } finally {
    timer = setInterval(() => { getCurrentReport() }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.monitor-list {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  .monitor-card {
    display: inline-block;
    width: 33.33333333%;
    min-width: 360px;

    .card-body {
      cursor: pointer;
      transition: all .3s;
      margin: 5px;
      background-color: #f5f5f5;
      border-radius: 10px;
      padding: 20px;
      height: 80px;
      vertical-align: top;

      .head {
        display: flex;
        flex-direction: row;

        .title {
          flex: 1;
          font-size: 16px;
        }

        .code {
          color: #999;
          font-size: 14px;
        }
      }

      .value {
        font-weight: bold;
        font-size: 20px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;

        .light {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          margin-right: 5px;
        }
      }
    }

    .card-body:hover {
      transform: scale(1.05);
      z-index: 1;
      box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.2);
    }
  }
}
</style>
