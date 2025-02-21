<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="3"
        title="领料单"
      >
        <BillFormCode :bill="formData" />
        <el-form-item
          :label="PickingEntity.getFieldName('structure')"
          prop="structure"
        >
          <ASelect
            v-model="formData.structure"
            :selector="StructureSelector"
            disabled
          />
        </el-form-item>
      </AGroup>
      <BillFormMoreDetail :bill="formData" />
      <AGroup title="申领明细">
        <ATable
          :data-list="formData.details"
          :entity="PickingDetailEntity"
          :field-list="PickingDetailEntity.getTableFieldConfigList()"
          hide-ctrl
        >
          <template #materialCode="{ data }">
            {{ data.material?.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material?.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AGroup, ASelect, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useBillDetail } from '@/hook/billTable/useBillDetail'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'
import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { StructureSelector } from '@/view/console/factory/structure/component'

const props = defineProps(airPropsParam(new PickingEntity()))

const {
  title,
  formData,
  isLoading,
} = useBillDetail(props, PickingEntity, PickingService)

</script>
