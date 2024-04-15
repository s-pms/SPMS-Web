<template>
  <ADialog
    :hide-footer="!mult"
    title="请选择销售单"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <APanel>
      <AToolBar
        :loading="isLoading"
        :entity="SaleEntity"
        :service="SaleService"
        @on-search="onSearch"
        @on-add="onAdd"
      />
      <ATable
        :data-list="response.list"
        :show-select="mult"
        hide-delete
        hide-edit
        :select-list="selectList"
        :field-list="SaleEntity.getTableFieldConfigList().filter(item => !['status'].includes(item.key))"
        :entity="SaleEntity"
        :ctrl-width="80"
        hide-field-selector
        :hide-ctrl="mult"
        @on-select="onSelected"
      >
        <template #customerCode="row">
          {{ (row.data as SaleEntity).customer?.code || "-" }}
        </template>
        <template #customerName="row">
          {{ (row.data as SaleEntity).customer?.name || "-" }}
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
    </APanel>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleEditor } from '.'
import { SaleStatus } from '@/model/channel/sale/SaleStatus'

const props = defineProps(airPropsSelector(new SaleEntity()))

const {
  selectList, isLoading, response,
  onPageChanged, onSelected, onSearch, onAdd,
} = useAirSelector(props, SaleEntity, SaleService, {
  editView: SaleEditor,
  beforeSearch(requestData) {
    requestData.filter.status = SaleStatus.OUTPUTING
    return requestData
  },
})
</script>
<style scoped lang="scss"></style>
