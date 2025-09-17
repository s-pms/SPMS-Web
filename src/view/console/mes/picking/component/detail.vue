<script lang="ts" setup>
import { ADialog, AGroup, ASelect, ATable, DialogProps, getFieldLabel } from '@airpower/web'
import { BillFormCode, BillFormMoreDetail } from '@/component'
import { useBillDetail } from '@/hook/billTable/useBillDetail'

import { PickingDetailEntity } from '@/model/mes/picking/PickingDetailEntity'
import { PickingEntity } from '@/model/mes/picking/PickingEntity'
import { PickingService } from '@/model/mes/picking/PickingService'
import { StructureSelector } from '@/view/console/factory/structure/component'

const props = defineProps(DialogProps.withParam(new PickingEntity()))

const {
  title,
  formData,
  isLoading,
} = useBillDetail(props, PickingService)
</script>

<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="80%"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <el-form
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
          :label="getFieldLabel(PickingEntity, 'structure')"
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
          hide-add
          hide-ctrl
        />
      </AGroup>
    </el-form>
  </ADialog>
</template>
