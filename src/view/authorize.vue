<script lang="ts" setup>
import type { OauthScope } from '@/model/open/oauth/OauthScope'
import { FeedbackUtil, RouterUtil } from '@airpower/web'
import { ref } from 'vue'
import Copyright from '@/component/login/Copyright.vue'
import Logo from '@/component/login/Logo.vue'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

const user = ref(new UserEntity())

const appKey = (RouterUtil.router.currentRoute.value.query.appKey || '').toString()
const scope = (RouterUtil.router.currentRoute.value.query.scope || '').toString()
const redirectUri = (RouterUtil.router.currentRoute.value.query.redirectUri || '/console').toString()

const appInfo = ref(new OpenAppEntity())

const scopeList = ref([] as OauthScope[])
const scopeNeed = ref([] as string[])

// 一些Loading状态
const isLoading = ref(false)

/**
 * ### 获取当前应用信息
 */
async function getAppInfo() {
  appInfo.value = await OpenAppService.create(isLoading).getAppByKey(appKey)
}

async function getScopeList() {
  const list = await UserService.create(isLoading).getScopeList()
  scopeList.value = list.filter(item => scopeNeed.value.includes(item.name) || item.isDefault)
}

async function onConfirm() {
  const result = await UserService.create(isLoading).authorize(appKey, scope)
  window.location.href = `${redirectUri}?code=${result}`
}

function onCancel() {
  window.location.href = `${redirectUri}?error=cancel`
}

async function init() {
  if (!appKey || !scope || !redirectUri) {
    window.location.replace('/')
    return
  }
  user.value = await UserService.create(isLoading).getMyInfo()
  getAppInfo()
  getScopeList()
  scopeNeed.value = scope.split(',')
}

async function onSwitchAccount() {
  await FeedbackUtil.confirmWarning('是否确认切换登录的账号', '切换账号')
  window.location.replace(`/login${window.location.search}`)
}

init()
</script>

<template>
  <div class="authorize">
    <Logo />
    <div
      v-loading="isLoading"
      class="card"
    >
      <div class="title">
        Hi, {{ user.nickname }}
        <el-link @click="onSwitchAccount()">
          切换账号
        </el-link>
      </div>
      <div class="account">
        是否授权 {{ appInfo.appName || '...' }} 访问你的：
      </div>
      <div class="scopes">
        <div
          v-for="item in scopeList"
          :key="item.name"
          class="item"
        >
          {{ item.description }}
        </div>
      </div>
      <div class="footer">
        <el-button
          size="large"
          type="primary"
          @click="onConfirm()"
        >
          确认授权
        </el-button>
        <el-button
          size="large"
          @click="onCancel()"
        >
          取消授权
        </el-button>
      </div>
    </div>
    <Copyright />
  </div>
</template>

<style lang="scss" scoped>
.authorize {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;

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

  .card {
    overflow: hidden;
    background-color: rgba($color: #f5f5f5, $alpha: 0.5);
    box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    min-height: 200px;
    max-height: 500px;

    .title {
      font-size: 24px;
      font-weight: bold;
    }

    .account {
      font-size: 16px;
      margin-top: 20px;
    }

    .scopes {
      background: #eee;
      margin: 20px 0;
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      width: 90%;
      padding: 15px 20px;
      border-radius: 15px;

      .item {
        position: relative;
        color: #999;
        font-size: 14px;
        margin: 5px 0;
      }

      .item::before {
        content: '';
        background: #999;
        width: 8px;
        height: 8px;
        display: inline-block;
        margin-right: 5px;
        border-radius: 100%;
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .el-button {
        flex: 1;
        margin: 0 5px;
      }
    }
  }
}

@media screen and ((orientation: portrait) and (max-width: 600px)) {
  .authorize {
    .logo {
      left: auto !important;
    }

    .card {
      width: 90% !important;
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
    }

    .item-3 {
      display: none;
    }
  }
}
</style>
