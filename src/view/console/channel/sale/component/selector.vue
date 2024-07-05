<template>
  <ADialog
    :hide-footer="!mult"
    title="请选择销售单"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
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
      <template #customerCode="{ data }">
        {{ data.customer?.code || "-" }}
      </template>
      <template #customerName="{ data }">
        {{ data.customer?.name || "-" }}
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
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleEditor } from '.'
import { SaleStatusEnum } from '@/model/channel/sale/SaleStatusEnum'

const props = defineProps(airPropsSelector(new SaleEntity()))

const {
  selectList, isLoading, response, disableConfirm,
  onPageChanged, onSelected, onSearch, onAdd,
} = useAirSelector(props, SaleEntity, SaleService, {
  editView: SaleEditor,
  beforeSearch(requestData) {
    requestData.filter.status = SaleStatusEnum.OUTPUTING.key
    return requestData
  },
})
</script>
<style scoped lang="scss"></style>
