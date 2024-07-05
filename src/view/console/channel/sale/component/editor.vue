<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    width="80%"
    height="80%"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="采购单"
        :column="2"
      >
        <AFormField field="billCode" />
        <el-form-item
          label="销售客户"
          prop="customerId"
        >
          <el-input
            v-model="formData.customerName"
            clearable
            placeholder="请选择销售客户"
            @clear="formData.exclude('customer', 'customerId')"
            @click="selectCustomer()"
          />
        </el-form-item>
        <AFormField
          field="reason"
          style="width: 100%;"
        />
      </AGroup>
      <AGroup title="采购明细">
        <ATable
          :entity="SaleDetailEntity"
          :data-list="formData.details"
          :field-list="SaleDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-edit
          hide-delete
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
          <template #addButton>
            <AButton
              type="ADD"
              @click="addDetail()"
            >
              添加{{ SaleEntity.getFieldName('details') }}
            </AButton>
          </template>
          <template #customRow="{ index }">
            <AButton
              type="DELETE"
              danger
              icon-button
              @click="deleteDetail(index)"
            />
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { SaleDetailEntity } from '@/model/channel/sale/SaleDetailEntity'
import { SaleEntity } from '@/model/channel/sale/SaleEntity'
import { SaleService } from '@/model/channel/sale/SaleService'
import { SaleDetailEditor } from '.'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { CustomerSelector } from '../../customer/component'

const props = defineProps(airPropsParam(new SaleEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, SaleEntity, SaleService, {
  afterGetDetail(detailData) {
    detailData.customerName = detailData.customer.name
    detailData.customerId = detailData.customer.id
    return detailData
  },
  beforeSubmit(submitData) {
    if (submitData.details.length === 0) {
      AirNotification.warning('请添加明细后再提交')
      return null
    }
    return submitData
  },
})

async function addDetail() {
  const newDetail = new SaleDetailEntity()
  newDetail.customer = formData.value.customer
  const detail: SaleDetailEntity = await AirDialog.show(SaleDetailEditor, newDetail)

  formData.value.details.push(detail)
}

async function deleteDetail(index: number) {
  await AirConfirm.warning('是否删除选中行的采购明细？')
  formData.value.details.splice(index, 1)
}

async function selectCustomer() {
  formData.value.customer = await AirDialog.select(CustomerSelector)
  formData.value.customerId = formData.value.customer.id
  formData.value.customerName = formData.value.customer.name
}
</script>
