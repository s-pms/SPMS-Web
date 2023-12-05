<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="70%"
    height="70%"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="基本信息"
        :column="2"
      >
        <el-form-item
          :label="DeviceEntity.getFieldName('name')"
          prop="name"
        >
          <AInput
            v-model.name="formData.name"
            :entity="DeviceEntity"
          />
        </el-form-item>
        <el-form-item
          :label="DeviceEntity.getFieldName('code')"
          prop="code"
        >
          <AInput
            v-model.code="formData.code"
            :entity="DeviceEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        :column="2"
        title="采集配置"
      >
        <el-form-item
          :label="DeviceEntity.getFieldName('isReporting')"
          prop="isReporting"
        >
          <AInput
            v-model.isReporting="formData.isReporting"
            :entity="DeviceEntity"
          />
        </el-form-item>
        <el-form-item
          v-if="formData.isReporting"
          :label="DeviceEntity.getFieldName('uuid')"
          prop="uuid"
        >
          <AInput
            v-model.uuid="formData.uuid"
            :entity="DeviceEntity"
          />
        </el-form-item>
        <el-form-item
          v-if="formData.isReporting"
          :label="DeviceEntity.getFieldName('rate')"
          prop="rate"
        >
          <AInput
            v-model.rate="formData.rate"
            :entity="DeviceEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        title="采集参数"
        :column="1"
      >
        <div class="parameter-list">
          <AButton
            type="ADD"
            @click="selectParameter()"
          >
            选择
          </AButton>
          <el-tag
            v-for="(parameter, index) in formData.parameters"
            :key="parameter.id"
            size="large"
            :closable="!parameter.isSystem"
            :type="parameter.isSystem?'info':'primary'"
            @close="formData.parameters.splice(index, 1)"
          >
            {{ parameter.label }}({{ parameter.code }})
          </el-tag>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AGroup, AInput,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterSelector } from '@/view/console/iot/parameter/component'

const props = defineProps(airPropsParam(new DeviceEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, DeviceEntity, DeviceService, {
  afterGetDetail(detailData) {
    const systemList = detailData.parameters.filter((item) => item.isSystem)
    const customList = detailData.parameters.filter((item) => !item.isSystem)
    detailData.parameters = systemList.concat(customList)
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('unitId')
    return submitData
  },
})

async function selectParameter() {
  DeviceService.create().getDevice(formData.value.uuid)
  const filter = new ParameterEntity()
  filter.isSystem = false
  const systemList = formData.value.parameters.filter((item) => item.isSystem)
  const customList = (await AirDialog.selectList(ParameterSelector, formData.value.parameters, filter)).filter((item) => !item.isSystem)
  formData.value.parameters = systemList.concat(customList)
}
</script>
<style scoped lang="scss">

.parameter-list{
  >*{
    margin-right: 5px;
  }
}
</style>
