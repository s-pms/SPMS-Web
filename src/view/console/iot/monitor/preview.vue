<template>
  <APanel>
    <AGroup title="设备状态统计">
      <div class="device-view">
        <div
          v-for="item in DeviceStatusDictionary"
          :key="(item.key as number)"
          class="device-item"
        >
          <div
            class="device-card"
            :style="{ borderColor: item.color }"
          >
            <div class="device-status">
              <span :style="{ backgroundColor: item.color }" />{{ item.label }}
            </div>
            <div class="device-number">
              {{ AirRand.getRandNumber(10, 99) }}
              <span>台</span>
            </div>
          </div>
        </div>
      </div>
    </AGroup>
    <AGroup
      title="设备实时状态"
      :column="1"
    >
      <div
        v-if="deviceList.length > 0"
        class="device-list"
      >
        <div
          v-for="device in deviceList"
          :key="device.id"
          class="device-item"
        >
          <div class="device-card">
            <div
              class="bg"
              :style="{ backgroundColor: DeviceStatusDictionary.getColor(device.status), }"
            />
            <div class="device-header">
              <div class="device-name">
                {{ device.name }}
              </div>
              <div class="device-code">
                {{ device.code }}
              </div>
            </div>
            <div class="device-body">
              <div
                class="device-partcnt"
                :style="{ color: DeviceStatusDictionary.getColor(device.status) }"
              >
                {{ device.partCount }}

                <span>产量</span>
              </div>
              <div class="device-info">
                <div
                  v-if="device.status === DeviceStatus.ALARM && device.alarm !== AlarmStatus.NONE"
                  class="device-status"
                  :style="{ borderColor: AlarmStatusDictionary.getColor(device.alarm), color: AlarmStatusDictionary.getColor(device.alarm) }"
                >
                  <span :style="{ backgroundColor: AlarmStatusDictionary.getColor(device.alarm), }" />
                  {{ AlarmStatusDictionary.getLabel(device.alarm, "未知") }}
                </div>

                <div
                  class="device-status"
                  :style="{ borderColor: DeviceStatusDictionary.getColor(device.status), color: DeviceStatusDictionary.getColor(device.status) }"
                >
                  <span :style="{ backgroundColor: DeviceStatusDictionary.getColor(device.status), }" />
                  {{ DeviceStatusDictionary.getLabel(device.status, "未知") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AEmpty v-else>
        设备加载中,请稍后...
      </AEmpty>
    </AGroup>
  </APanel>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import {
  AEmpty,
  AGroup,
  APanel,
} from '@/airpower/component'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { DeviceStatusDictionary } from '@/model/asset/device/DeviceStatusDictionary'
import { AlarmStatusDictionary } from '@/model/asset/device/AlarmStatusDictionary'
import { DeviceStatus } from '@/model/asset/device/DeviceStatus'
import { AlarmStatus } from '@/model/asset/device/AlarmStatus'
import { AirRand } from '@/airpower/helper/AirRand'

const deviceList = ref([] as DeviceEntity[])

async function getDeviceList() {
  deviceList.value = await DeviceService.create().getList(new AirRequest(DeviceEntity))
}

const timer = setInterval(() => { getDeviceList() }, 1000)
getDeviceList()
onUnmounted(() => {
  clearInterval(timer)
})
</script>
<style scoped lang="scss">
.device-view {
  .device-item {
    width: 20%;
    display: inline-block;

    .device-card {
      border: 2px dashed;
      margin: 5px;
      border-radius: 10px;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .device-status {
        flex: 1;
        width: 0;
        font-size: 16px;
      }

      .device-number {
        font-size: 24px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          color: #999;
          font-weight: normal;
          font-size: 16px;
        }
      }
    }
  }
}

.device-list {

  .device-item {
    width: 25%;
    display: inline-block;
    min-width: 360px;

    .device-card {
      background-color: #f8f8f8;
      margin: 5px;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;
      z-index: 0;
      transition: all .3s;
      position: relative;
      overflow: hidden;
      text-shadow: 0px 1px 1px rgba($color: #fff, $alpha: 1);

      .bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.1;
      }

      .device-header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .device-name {
          font-size: 18px;
          flex: 1;
          width: 0;
        }

        .device-code {
          font-size: 14px;
          color: #999;
        }
      }

      .device-body {
        display: flex;
        flex-direction: row;
        align-items: flex-end;

        .device-partcnt {
          font-size: 24px;
          font-weight: bolder;
          margin-top: 20px;
          color: #ff4500;
          flex: 1;

          span {
            font-size: 12px;
            color: #999;
            font-weight: normal;
            margin-left: -5px;
          }
        }

        .device-info {
          display: flex;
          flex-direction: row;
          align-items: center;

          .device-status {
            margin-left: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 1px solid transparent;
            padding: 0px 3px;
            border-radius: 5px;
            font-size: 13px;

            span {
              width: 10px;
              height: 10px;
              border-radius: 100%;
              display: inline-block;
              margin-right: 5px;
            }
          }
        }
      }
    }

    .device-card:hover {
      transform: scale(1.05);
      box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.1);
      z-index: 1;
    }
  }
}
</style>
