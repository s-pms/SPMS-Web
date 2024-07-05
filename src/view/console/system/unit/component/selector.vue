<template>
  <ADialog
    width="600px"
    height="70%"
    :hide-footer="!mult"
    :title="title"
    is-selector
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      :loading="isLoading"
      :entity="UnitEntity"
      :service="UnitService"
      @on-search="onSearch"
      @on-add="onAdd"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="UnitEntity"
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
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { UnitService } from '@/model/system/unit/UnitService'
import { UnitEditor } from '.'

const props = defineProps(airPropsSelector<UnitEntity>())

const {
  title, selectList, isLoading, response, disableConfirm,
  onSearch, onPageChanged, onReloadData, onSelected,
} = useAirSelector(props, UnitEntity, UnitService)

async function onAdd() {
  await AirDialog.show(UnitEditor)
  onReloadData()
}
</script>
<style scoped lang="scss"></style>
