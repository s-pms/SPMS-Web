<template>
  <ADialog
    :hide-footer="!mult"
    :title="title"
    is-selector
    width="70%"
    height="70%"
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      :loading="isLoading"
      :entity="CustomerEntity"
      :service="CustomerService"
      @on-search="onSearch"
      @on-add="onAdd"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="CustomerEntity"
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
import { CustomerEntity } from '@/model/channel/customer/CustomerEntity'
import { CustomerService } from '@/model/channel/customer/CustomerService'
import { CustomerEditor } from '.'

const props = defineProps(airPropsSelector<CustomerEntity>())

const {
  title, selectList, isLoading, response,
  onSearch, onPageChanged, onSelected, onAdd,
} = useAirSelector(props, CustomerEntity, CustomerService, {
  editView: CustomerEditor,
})
</script>
<style scoped lang="scss"></style>
