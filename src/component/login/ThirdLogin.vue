<script lang="ts" setup>
import { ThirdLoginPlatform } from '@/model/open/thirdlogin/ThirdLoginPlatform'
import { FeedbackUtil } from '@airpower/web'

function getIcon(item: ThirdLoginPlatform) {
  return `/img/thirdlogin/${item.flag}.png`
}

function onLogin(item: ThirdLoginPlatform) {
  if (item.disabled) {
    FeedbackUtil.toastError(`暂不支持${item.label}`)
    return
  }
  const redirectUri = `${window.location.origin}/callback/${item.flag}`
  const url = item.oauthUrl.replace('APP_KEY', item.appKey).replace('REDIRECT_URI', redirectUri)
  // 使用window.open 小窗口 隐藏地址栏

  const features = `menubar=no,toolbar=no,status=no,width=${item.width},height=${item.height},left=${(window.screen.width - item.width) / 2},top=${(window.screen.height - item.height) / 2}`
  window.open(url, '_blank', features)
}
</script>

<template>
  <div class="third-login">
    <div
      v-for="item in ThirdLoginPlatform.toArray().filter((item) => !item.disabled)"
      :key="item.key"
      v-tip="item.label"
      class="item"
      @click="onLogin(item)"
    >
      <div class="icon">
        <img
          :src="getIcon(item)"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.third-login {
  display: flex;
  flex-direction: row;
  align-items: center;

  .item {
    flex: 1;
    cursor: pointer;

    .icon {
      margin: 2px 3px;
      background-color: #ddd;
      border-radius: 8px;
      width: 20px;
      height: 20px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      transition: all 0.5s;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .icon:hover {
      background-color: #aaa;
    }
  }
}
</style>
