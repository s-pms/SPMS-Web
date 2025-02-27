<script lang="ts" setup>
import { DialogStatus } from '@/model/chat/DialogStatus'

const emits = defineEmits(['open'])
</script>

<template>
  <div class="tool">
    <div class="tool-left">
      <div
        class="tool-item"
        @click="emits('open',DialogStatus.EMOJI)"
      >
        <i class="iconfont icon-pic_fill" /><span>表情</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  display: flex;
  flex-direction: row;
  padding: 10px 10px 5px;

  .tool-left {
    display: flex;
    flex-direction: row;
    flex: 1;
    font-size: 13px;
    color: #999;
    align-items: center;

    .tool-item {
      user-select: none;
      padding: 5px 10px;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        margin-right: 2px;
        display: inline-block;
      }
    }

    .tool-item:hover {
      background-color: #eee;
    }
  }
}
</style>
