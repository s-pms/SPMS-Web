<script lang="ts" setup>
import { ADialog, DialogProps } from '@airpower/web'
import { ref } from 'vue'

defineProps(
  Object.assign(DialogProps.create(), {
    /**
     * ### 弹出标题
     */
    param: {
      type: String,
      default: '驳回',
    },
  }),
)

const rejectReason = ref('')
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="rejectReason === ''"
    :title="param"
    min-height="200px"
    @confirm="onConfirm(rejectReason)"
    @cancel="onCancel"
  >
    <el-input
      v-model="rejectReason"
      :rows="3"
      placeholder="请输入驳回原因..."
      type="textarea"
    />
  </ADialog>
</template>
