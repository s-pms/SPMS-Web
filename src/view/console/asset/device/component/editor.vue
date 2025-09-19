<script lang="ts" setup>
import { AButton, ADialog, AFormField, AGroup, DialogProps, DialogUtil, useEditor } from '@airpower/web'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'

import { DeviceService } from '@/model/asset/device/DeviceService'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { ParameterSelector } from '@/view/console/iot/parameter/component'

const props = defineProps(DialogProps.withParam(new DeviceEntity()))

const {
  title,
  formData,
  rules,
  formRef,
  isLoading,
  onSubmit,
} = useEditor(props, DeviceService, {
  afterGetDetail(detailData) {
    const systemList = detailData.parameters.filter(item => item.isSystem)
    const customList = detailData.parameters.filter(item => !item.isSystem)
    detailData.parameters = systemList.concat(customList)
    return detailData
  },
  beforeSubmit(submitData) {
    submitData.exclude('unitId')
    return submitData
  },
})

async function selectParameter() {
  const filter = new ParameterEntity()
  filter.isSystem = false
  const systemList = formData.value.parameters.filter(item => item.isSystem)
  const customList = (await DialogUtil.selectList(ParameterSelector, formData.value.parameters, filter)).filter(
    item => !item.isSystem,
  )
  formData.value.parameters = systemList.concat(customList)
}
</script>

<template>
  <ADialog
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    height="70%"
    width="70%"
    @cancel="onCancel"
    @confirm="onSubmit"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="基本信息"
      >
        <AFormField field="name" />
        <AFormField field="code" />
      </AGroup>
      <AGroup
        :column="2"
        title="采集配置"
      >
        <AFormField field="isReporting" />
        <AFormField
          v-if="formData.isReporting"
          field="uuid"
        />
        <AFormField
          v-if="formData.isReporting"
          field="rate"
        />
      </AGroup>
      <AGroup
        :column="1"
        title="采集参数"
      >
        <div class="parameter-list">
          <AButton
            type="CHECK"
            @click="selectParameter()"
          >
            选择
          </AButton>
          <el-tag
            v-for="(parameter, index) in formData.parameters"
            :key="parameter.id"
            :closable="!parameter.isSystem"
            :type="parameter.isSystem ? 'info' : 'primary'"
            size="large"
            @close="formData.parameters.splice(index, 1)"
          >
            {{ parameter.label }}({{ parameter.code }})
          </el-tag>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<style lang="scss" scoped>
.parameter-list {
  > * {
    margin-right: 5px;
  }
}
</style>
