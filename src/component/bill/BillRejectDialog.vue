<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="rejectReason === ''"
    :title="param"
    min-height="200px"
    @on-confirm="onConfirm(rejectReason)"
    @on-cancel="onCancel"
  >
    <el-input
      v-model="rejectReason"
      :rows="3"
      placeholder="请输入驳回原因..."
      type="textarea"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'

defineProps(Object.assign(airProps(), {
  /**
   * # 弹出标题
   */
  param: {
    type: String,
    default: '驳回',
  },
}))

const rejectReason = ref('')

</script>
