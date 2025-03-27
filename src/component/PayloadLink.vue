<template>
  <el-link @click="showDetail">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>
<script generic="P extends IPayload" lang="ts" setup>
import { Component } from 'vue'
import { AirDialog } from '@airpower/helper/AirDialog'
import { IPayload } from '@airpower/interface/IPayload'

const {
  payload,
  view,
} = defineProps<{
  /**
   * ### 单据
   */
  payload: P,

  /**
   * ### 单据详情页组件
   */
  view: Component,
}>()

function showDetail() {
  AirDialog.show(view, payload)
}
</script>
<style lang="scss" scoped></style>
