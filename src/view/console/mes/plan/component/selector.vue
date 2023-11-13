<template>
  <ADialog
    :hide-footer="!mult"
    :title="title"
    is-selector
    width="60%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="PlanEntity"
      :service="PlanService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="PlanEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template #customerCode="row">
        {{ (row.data as PlanEntity).customer?.code || "-" }}
      </template>
      <template #customerName="row">
        {{ (row.data as PlanEntity).customer?.name || "-" }}
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
    <template #footerRight>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  APage, ATable, AToolBar, ADialog, AButton,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { PlanEntity } from '@/model/mes/plan/PlanEntity'
import { PlanService } from '@/model/mes/plan/PlanService'

const props = defineProps(airPropsSelector<PlanEntity>())

const {
  title, selectList, onSelected, isLoading, response,
  onSearch, onPageChanged,
} = useAirSelector(props, PlanEntity, PlanService)
</script>
<style scoped lang="scss"></style>
