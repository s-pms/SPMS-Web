<script lang="ts" setup>
import type { IJson } from '@airpower/web'
import { DateTimeUtil, FeedbackUtil, RouterUtil } from '@airpower/web'
import { ref } from 'vue'
import { UserService } from '@/model/personnel/user/UserService'

const isLoading = ref(true)

async function init() {
  const platform = RouterUtil.router.currentRoute.value.params.platform.toString()
  const code = RouterUtil.router.currentRoute.value.query.code?.toString() || ''
  try {
    await UserService.create(isLoading).thirdBind(platform, code)
  }
  catch (e) {
    await FeedbackUtil.alertError((e as IJson).message)
    return
  }
  FeedbackUtil.toastSuccess('绑定第三方账号成功')
  await DateTimeUtil.sleep(3000)
  window.close()
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
