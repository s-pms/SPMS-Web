<template>
  <ADialog
    title="设备监控"
    hide-confirm
    width="70%"
    height="70%"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="基本信息"
      >
        <el-form-item
          :label="DeviceEntity.getFieldName('name')"
          prop="name"
        >
          <AInput
            v-model.name="formData.name"
            :entity="DeviceEntity"
            disabled
          />
        </el-form-item>
        <el-form-item
          :label="DeviceEntity.getFieldName('code')"
          prop="code"
        >
          <AInput
            v-model.code="formData.code"
            disabled
            :entity="DeviceEntity"
          />
        </el-form-item>
        <el-form-item
          :label="DeviceEntity.getFieldName('uuid')"
          prop="uuid"
        >
          <AInput
            v-model.uuid="formData.uuid"
            disabled
            :entity="DeviceEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="监控参数">
        <div
          v-for="item in monitorList"
          :key="item.code"
          class="monitor-card"
        >
          <div class="card-body">
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
                v-if="['status','alarm'].includes(item.code)"
                class="light"
                :style="{backgroundColor:getColor(item)}"
              />
              {{ getValue(item) }}
            </div>
          </div>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { ADialog, AGroup, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { CollectionEntity } from '@/model/iot/collection/CollectionEntity'
import { DeviceStatusDictionary } from '@/model/asset/device/DeviceStatusDictionary'

const props = defineProps(airPropsParam(new DeviceEntity()))

const formData = ref(props.param.copy())

const monitorList = ref([] as CollectionEntity[])

async function getDetail() {
  formData.value = await DeviceService.create().getDetail(props.param.id)
}

async function getCollectionList() {
  monitorList.value = await DeviceService.create().getCollectionList(props.param.id)
}

const timer = setInterval(() => { getCollectionList() }, 1000)

onUnmounted(() => {
  clearInterval(timer)
})

getDetail()

function getValue(item: CollectionEntity) {
  switch (item.code) {
    case 'status':
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.label || '-'
    case 'alarm':
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.label || '-'
    default:
      return item.value
  }
}

function getColor(item: CollectionEntity) {
  switch (item.code) {
    case 'status':
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.color || '-'
    case 'alarm':
      return DeviceStatusDictionary.find((i) => i.key === parseInt(item.value, 10))?.color || '-'
    default:
      return item.value
  }
}

</script>

<style lang="scss" scoped>
.monitor-card {
  display: inline-block;
  width: 33.33333333%;

  .card-body {
    margin: 5px;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;

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

      .light{
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 5px;
      }
    }
  }
}
</style>