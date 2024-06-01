<template>
  <ADialog
    :hide-footer="!mult"
    title="请选择已完成的采购单"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :field-list="PurchaseEntity.getTableFieldConfigList().filter(item => !['status'].includes(item.key))"
      :entity="PurchaseEntity"
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
  AButton, ADialog, APage, ATable,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { PurchaseEntity } from '@/model/channel/purchase/PurchaseEntity'
import { PurchaseService } from '@/model/channel/purchase/PurchaseService'
import { PurchaseEditor } from '.'
import { PurchaseStatusEnum } from '@/model/channel/purchase/PurchaseStatusEnum'

const props = defineProps(airPropsSelector(new PurchaseEntity()))

const {
  selectList, isLoading, response,
  onPageChanged, onSelected,
} = useAirSelector(props, PurchaseEntity, PurchaseService, {
  editView: PurchaseEditor,
  beforeSearch(requestData) {
    requestData.filter.status = PurchaseStatusEnum.DONE.key
    return requestData
  },
})
</script>
<style scoped lang="scss"></style>
