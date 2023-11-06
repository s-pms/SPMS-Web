<template>
  <div
    v-loading="isLoading"
    class="callback big-loading"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AirConfig } from '@/airpower/config/AirConfig'

const isLoading = ref(true)

// eslint-disable-next-line no-console
console.log(AirConfig.router.currentRoute.value.query.code)

</script>
<style lang="scss" scoped>
.callback {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
