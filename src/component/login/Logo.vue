<script lang="ts" setup>

</script>

<template>
  <div class="logo">
    <img
      alt=""
      src="@/assets/img/logo.svg"
    >
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: 60px;
  padding: 10px;
  background-color: rgba($color: #fff, $alpha: 0.1);
  border-radius: 20px;
  position: absolute;
  left: 30px;
  top: 30px;

  img {
    height: 100%;
  }
}

@media screen and ((orientation:portrait) and (max-width: 600px)) {
  .logo {
    left: auto !important;
    top: 100px !important;
  }
}
</style>
