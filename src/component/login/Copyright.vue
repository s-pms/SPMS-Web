<script lang="ts" setup>

</script>

<template>
  <div class="copyright">
    Copyright Hamm.cn &copy;{{ new Date().getFullYear() }}, All Rights Reserved. Powered By
    <el-link
      href="https://github.com/HammCn/AirPower4T"
      target="_blank"
    >
      AirPower4T
    </el-link>
  </div>
</template>

<style lang="scss" scoped>

.copyright {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 20px;
  text-align: center;
  color: #aaa;
  font-size: 14px;
  text-shadow: 0 1px 1px rgba($color: #fff, $alpha: 1);
}
</style>
