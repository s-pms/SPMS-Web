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
      :entity="StorageEntity"
      :service="StorageService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="StorageEntity"
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
          @click="onConfirm(data)"
        />
      </template>
    </ATable>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ATable, AToolBar, ADialog, AButton,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { StorageService } from '@/model/factory/storage/StorageService'

const props = defineProps(airPropsSelector<StorageEntity>())

const {
  title, selectList, isLoading, list, disableConfirm,
  onSearch, onSelected,
} = useAirSelector(props, StorageEntity, StorageService, {
  unPaginate: true,
})

</script>
<style scoped lang="scss"></style>
