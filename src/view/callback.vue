<script lang="ts" setup>
import {UserService} from '@/model/personnel/user/UserService'
import type {IJson} from '@airpower/web'
import {DateTimeUtil, FeedbackUtil, RouterUtil, WebConfig} from '@airpower/web'
import {ref} from 'vue'

const isLoading = ref(true)

async function init() {
  const platform = RouterUtil.router.currentRoute.value.params.platform.toString()
  const code = RouterUtil.router.currentRoute.value.query.code?.toString() || ''
  try {
    const accessToken = await UserService.create(isLoading).callbackCode(platform, code)
    WebConfig.saveAccessToken(accessToken)
  }
  catch (e) {
    await FeedbackUtil.alertError((e as IJson).message)
    return
  }

  await DateTimeUtil.sleep(3000)

  // 判断当前窗口是否由 window.open 打开
  if (window.opener) {
    window.close()
  }
  else {
    window.location.replace('/console')
  }
}

init()
</script>

<template>
  <div
    v-loading="isLoading"
    class="callback big-loading"
  />
</template>

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
