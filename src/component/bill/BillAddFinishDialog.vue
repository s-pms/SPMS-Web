<template>
  <ADialog
    title="添加完成数量"
    :disable-confirm="num <= 0"
    min-height="200px"
    :fullable="false"
    confirm-text="添加完成"
    @on-confirm="onConfirm(num)"
    @on-cancel="onCancel()"
  >
    <el-input
      v-model="num"
      type="number"
      placeholder="请输入本次完成数量..."
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'

const props = defineProps(Object.assign(airProps(), {
  /**
   * # 添加完成数量
   */
  param: {
    type: Number,
    default: 0,
  },
}))

const num = ref(props.param)

</script>
