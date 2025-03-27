<template>
  <div
    v-loading="isLoading"
    class="callback big-loading"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AirRouter } from '@airpower/helper/AirRouter'
import { AirConfig } from '@airpower/config/AirConfig'
import { AirAlert } from '@airpower/feedback/AirAlert'
import { AirAny } from '@airpower/type/AirType'
import { UserService } from '@/model/personnel/user/UserService'

const isLoading = ref(true)

async function init() {
  const platform = AirRouter.router.currentRoute.value.params.platform.toString()
  const code = AirRouter.router.currentRoute.value.query.code?.toString() || ''
  try {
    const accessToken = await UserService.create(isLoading)
      .callbackCode(platform, code)
    AirConfig.saveAccessToken(accessToken)
  } catch (e) {
    await AirAlert.create()
      .hideClose()
      .error((e as AirAny).message, '登录失败')
  }
  // 判断当前窗口是否由 window.open 打开
  if (window.opener) {
    window.close()
  } else {
    window.location.replace('/console')
  }
}

init()
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
