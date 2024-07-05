<template>
  <ADialog
    :hide-footer="!mult"
    :title="title"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="MoveEntity"
      :service="MoveService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="MoveEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template #storageName="{ data }">
        {{ data.storage.name }}({{ data.storage.code }})
      </template>
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
import { MoveEntity } from '@/model/wms/move/MoveEntity'
import { MoveService } from '@/model/wms/move/MoveService'

const props = defineProps(airPropsSelector<MoveEntity>())

const {
  title, selectList, isLoading, response, disableConfirm,
  onSearch, onPageChanged, onSelected,
} = useAirSelector(props, MoveEntity, MoveService)
</script>
<style scoped lang="scss"></style>
