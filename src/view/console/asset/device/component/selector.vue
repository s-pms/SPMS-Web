<template>
  <ADialog
    :hide-footer="!mult"
    :title="title"
    is-selector
    width="70%"
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="DeviceEntity"
      :service="DeviceService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="DeviceEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template
        v-if="!mult"
        #customRow="{ data }"
      >
        <AButton
          type="SELECT"
          icon-button
          :disabled="data.isDisabled"
          tooltip="选择"
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, APage, ATable, AToolBar,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { DeviceEntity } from '@/model/asset/device/DeviceEntity'
import { DeviceService } from '@/model/asset/device/DeviceService'

const props = defineProps(airPropsSelector<DeviceEntity>())

const {
  disableConfirm, title, selectList, isLoading, response,
  onSearch, onPageChanged, onSelected,
} = useAirSelector(props, DeviceEntity, DeviceService)
</script>
<style scoped lang="scss"></style>
