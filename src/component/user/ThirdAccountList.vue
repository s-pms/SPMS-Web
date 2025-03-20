<template>
  <div class="account-list">
    <div
      v-for="item in ThirdLoginPlatform.toArray()"
      :key="item.key"
      :class="isBind(item) ? 'active' : ''"
      class="account"
    >
      <div class="left">
        <img
          :src="getIcon(item)"
          class="logo"
        >
        <div class="name">
          {{ item.label }}
        </div>
      </div>
      <div class="right">
        <template v-if="isBind(item)">
          <div class="name">
            {{ bindData(item)?.nickName || bindData(item)?.thirdUserId || '-' }}
          </div>
          <img
            v-if="getAvatar(item)"
            :src="getAvatar(item)"
            class="avatar"
          >
          <el-link
            class="unbind"
            @click="onUnBind(item)"
          >
            解绑
          </el-link>
        </template>
        <template v-else>
          <el-link @click="onBind(item)">
            绑定
          </el-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { airProps } from '@/airpower/config/AirProps'
import { ThirdLoginPlatform } from '@/model/open/thirdlogin/ThirdLoginPlatform'
import { UserThirdLoginEntity } from '@/model/open/thirdlogin/UserThirdLoginEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

defineProps(airProps())

const isLoading = ref(false)

function getIcon(item: ThirdLoginPlatform) {
  return `/img/thirdlogin/${item.flag}.png`
}

const list = ref([] as UserThirdLoginEntity[])

async function init() {
  list.value = await UserService.create(isLoading)
    .getMyThirdList()
}

function isBind(item: ThirdLoginPlatform) {
  return list.value.some((v) => v.platform === item.key)
}

function bindData(item: ThirdLoginPlatform) {
  return list.value.find((v) => v.platform === item.key)
}

function getAvatar(item: ThirdLoginPlatform) {
  return bindData(item)?.avatar || ''
}

function onBind(item: ThirdLoginPlatform) {
  if (item.disabled) {
    AirNotification.error(`暂不支持${item.label}`)
    return
  }
  const redirectUri = `${window.location.origin}/bind/${item.flag}`
  const url = item.oauthUrl.replace('APP_KEY', item.appKey)
    .replace('REDIRECT_URI', redirectUri)
  // 使用window.open 小窗口 隐藏地址栏

  const features = `menubar=no,toolbar=no,status=no,width=${item.width},height=${item.height},left=${(window.screen.width - item.width) / 2},top=${(window.screen.height - item.height) / 2}`
  const newWindow = window.open(url, '_blank', features)
  const checkClosedInterval = setInterval(() => {
    if (newWindow?.closed) {
      clearInterval(checkClosedInterval)
      init()
    }
  }, 100)
}

async function onUnBind(item: ThirdLoginPlatform) {
  const data = bindData(item)
  if (!data) {
    return
  }
  await AirConfirm.warning(`是否确认解绑 ${item.label} 账号？`, '解绑提醒')
  await UserService.create(isLoading)
    .unBindThird(data)
  init()
}

init()
</script>
<style lang="scss" scoped>
.account-list {
  overflow: hidden;
  overflow-y: auto;

  .account {
    margin: 5px 10px;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 20px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      background-color: #ccc;
      padding: 5px;
      border-radius: 10px;
    }

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #aaa;
      font-weight: bold;
      flex: 1;

      .logo {
        background-color: #aaa;
        margin-right: 10px;
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #aaa;
      font-weight: bold;

      .avatar {
        margin-left: 10px;
      }

      .unbind {
        margin-left: 10px;
      }
    }
  }

  .active {
    .left {
      color: var(--primary-color);

      .logo {
        background-color: var(--primary-color);
      }
    }
  }
}
</style>
