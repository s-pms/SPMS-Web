<template>
  <ADialog
    :loading="isLoading"
    :title="title"
    height="80%"
    width="70%"
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
        :column="2"
        title="配方信息"
      >
        <AFormField
          disabled
          field="billCode"
        />
        <AFormField
          disabled
          field="name"
        />
        <AFormField
          disabled
          field="type"
        />
        <AFormField
          disabled
          field="status"
        />
        <AFormField
          v-if="BomStatusEnum.REJECTED.equalsKey(formData.status)"
          disabled
          field="rejectReason"
        />
      </AGroup>
      <AGroup title="配方物料清单">
        <ATable
          :ctrl-width="80"
          :data-list="formData.details"
          :entity="BomDetailEntity"
          :field-list="BomDetailEntity.getTableFieldConfigList().filter(item => !['createTime'].includes(item.key))"
          hide-delete
          hide-edit
        >
          <template #materialCode="{ data }">
            {{ data.material.code }}
          </template>
          <template #materialName="{ data }">
            {{ data.material.name }}
          </template>
        </ATable>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  ADialog, AFormField, AGroup, ATable,
} from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { InputEntity } from '@/model/wms/input/InputEntity'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomService } from '@/model/mes/bom/BomService'
import { useAirDetail } from '@/airpower/hook/useAirDetail'
import { BomStatusEnum } from '@/model/mes/bom/BomStatusEnum'

const props = defineProps(airPropsParam(new InputEntity()))

const {
  title,
  formData,
  isLoading,
} = useAirDetail(props, BomEntity, BomService, {})

</script>
