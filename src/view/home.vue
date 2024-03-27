<template>
  <div class="home">
    <el-image
      class="logo"
      :src="logo"
    />
    <div class="intro">
      <img src="https://svg.hamm.cn?key=Lang&value=TypeScript">
      <img src="https://svg.hamm.cn?key=Base&value=Vue3">
      <img src="https://svg.hamm.cn?key=Build&value=Vite">
      <img src="https://svg.hamm.cn?key=UI&value=ElementPlus">
    </div>
    <div class="link">
      <router-link to="/console">
        Console
      </router-link>
      <router-link to="/login">
        Login
      </router-link>
      <el-link
        href="https://github.com/HammCn"
        target="_blank"
      >
        Github
      </el-link>
      <el-link
        href="https://gitee.com/air-power"
        target="_blank"
      >
        Gitee
      </el-link>
      <el-link
        href="https://juejin.cn/post/7273290114921889807"
        target="_blank"
      >
        JueJin
      </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/img/logo.svg'

</script>
<style scoped lang="scss">
.home {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    width: 300px;
    margin-bottom: 50px;
  }

  .intro {
    img {
      margin: 0px 5px;
    }
  }

  .link {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    a {
      margin: 0px 5px;
      font-size: 16px;
      color: var(--el-color-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>
