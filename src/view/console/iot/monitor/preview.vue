<template>
  <APanel>
    <AGroup
      title="设备实时状态"
      :column="1"
      disable-collapse
    >
      <div class="device-view">
        <div
          v-for="item in DeviceStatusEnum.toArray()"
          :key="item.key"
          class="device-item"
          :style="{ width: (deviceList.filter(i => i.status === item.key).length / deviceList.length * 100) + '%' }"
        >
          <div
            class="device-card"
            :style="{ background: item.color }"
          >
            <div class="device-status">
              <span :style="{ backgroundColor: item.color }" />{{ item.label }}
            </div>
            <div class="device-number">
              {{ deviceList.filter(i => i.status === item.key).length }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="deviceList.length > 0"
        class="device-list"
      >
        <div
          v-for="device in deviceList"
          :key="device.id"
          class="device-item"
        >
          <div
            class="device-card"
            @click="showMonitor(device)"
          >
            <div
              class="bg"
              :style="{ backgroundColor: DeviceStatusEnum.getColor(device.status), }"
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
                :style="{ color: DeviceStatusEnum.getColor(device.status) }"
              >
                {{ device.partCount }}

                <span>产量</span>
              </div>
              <div class="device-info">
                <div
                  v-if="device.status === DeviceStatusEnum.ALARM.key && device.alarm !== AlarmStatusEnum.NONE.key"
                  class="device-status"
                  :style="{ borderColor: AlarmStatusEnum.getColor(device.alarm), color: AlarmStatusEnum.getColor(device.alarm) }"
                >
                  <span :style="{ backgroundColor: AlarmStatusEnum.getColor(device.alarm), }" />
                  {{ AlarmStatusEnum.getLabel(device.alarm, "未知") }}
                </div>

                <div
                  class="device-status"
                  :style="{ borderColor: DeviceStatusEnum.getColor(device.status), color: DeviceStatusEnum.getColor(device.status) }"
                >
                  <span :style="{ backgroundColor: DeviceStatusEnum.getColor(device.status), }" />
                  {{ DeviceStatusEnum.getLabel(device.status, "未知") }}
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
import { AEmpty, AGroup, APanel } from '@/airpower/component'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { DeviceStatusEnum } from '@/model/asset/device/DeviceStatusEnum'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { DeviceMonitor } from '../../asset/device/component'
import { AlarmStatusEnum } from '@/model/asset/device/AlarmStatusEnum'

const deviceList = ref<DeviceEntity[]>([])

const request = ref(new AirRequest(DeviceEntity))
request.value.filter = new DeviceEntity()
request.value.filter.isReporting = true

async function getDeviceList() {
  deviceList.value = await DeviceService.create().getList(request.value)
}

const timer = setInterval(() => {
  getDeviceList()
}, 1000)
getDeviceList()
onUnmounted(() => {
  clearInterval(timer)
})

function showMonitor(device: DeviceEntity) {
  AirDialog.show(DeviceMonitor, device)
}
</script>
<style scoped lang="scss">
.device-view {
  margin: 0 8px;
  overflow: hidden;

  .device-item {
    display: inline-block;
    overflow: hidden;
    height: 100%;

    .device-card {
      overflow: hidden;
      padding: 2px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: white;
      text-shadow: 0 1px 5px rgba($color: #000, $alpha: 0.3);
      text-align: center;
      font-size: 12px;

      .device-status {
        display: inline-block;
      }

      .device-number {
        font-weight: bold;
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
      text-shadow: 0 1px 1px rgba($color: #fff, $alpha: 1);

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
            padding: 0 3px;
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
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
      z-index: 1;
    }
  }
}
</style>
