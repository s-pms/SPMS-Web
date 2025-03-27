<template>
  <div
    v-loading="isLoading"
    class="callback big-loading"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AirRouter } from '@airpower/helper/AirRouter'
import { AirAlert } from '@airpower/feedback/AirAlert'
import { AirAny } from '@airpower/type/AirType'
import { UserService } from '@/model/personnel/user/UserService'

const isLoading = ref(true)

async function init() {
  const platform = AirRouter.router.currentRoute.value.params.platform.toString()
  const code = AirRouter.router.currentRoute.value.query.code?.toString() || ''
  try {
    await UserService.create(isLoading)
      .thirdBind(platform, code)
  } catch (e) {
    await AirAlert.create()
      .hideClose()
      .error((e as AirAny).message, '登录失败')
  }
  await AirAlert.success('绑定第三方账号成功', '绑定成功')
  window.close()
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
