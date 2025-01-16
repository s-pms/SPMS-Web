<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField field="name" />
      <AFormField field="code" />

      <el-form-item
        label="关联物料"
        prop="material"
      >
        <ASelect
          v-model="formData.material"
          :param="materialFilter"
          :selector="MaterialSelector"
          placeholder="请选择工艺关联物料"
        />
      </el-form-item>
      <AFormField field="isRoutingBom" />
      <div class="tips">
        {{
          formData.isRoutingBom ? '使用工艺配方时,工序无需配置配方' : '不使用工艺配方,则各个工序可自行配置工序使用的配方'
        }}
      </div>
      <el-form-item
        v-if="formData.isRoutingBom"
        label="使用配方"
        prop="bom"
      >
        <ASelect
          v-model="formData.bom"
          :param="bomFilter"
          :selector="BomSelector"
          placeholder="请选择工艺关联配方"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AFormField, ASelect } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { RoutingEntity } from '@/model/mes/routing/RoutingEntity'
import { RoutingService } from '@/model/mes/routing/RoutingService'
import { MaterialSelector } from '@/view/console/asset/material/component'
import { BomSelector } from '@/view/console/mes/bom/component'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { BomTypeEnum } from '@/model/mes/bom/BomTypeEnum'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { MaterialTypeEnum } from '@/model/asset/material/MaterialTypeEnum'

const props = defineProps(airPropsParam(new RoutingEntity()))

const {
  formRef,
  isLoading,
  formData,
  rules,
  title,
  onSubmit,
} = useAirEditor(props, RoutingEntity, RoutingService, {})

const bom = new BomEntity()
bom.type = BomTypeEnum.NORMAL.key
bom.isPublished = true
const bomFilter = ref(bom)

const material = new MaterialEntity()
material.materialType = MaterialTypeEnum.PRODUCT.key
const materialFilter = ref(material)
</script>

<style lang="scss" scoped>
.tips {
  text-align: right;
  font-size: 12px;
  color: #ccc;
  margin-top: -15px;
  margin-bottom: 15px;
}
</style>
