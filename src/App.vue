<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})
</script>

<template>
  <div
    v-loading="isLoading"
    class="app"
  >
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  :deep(.el-loading-mask) {
    background-color: white;
  }
}
</style>
