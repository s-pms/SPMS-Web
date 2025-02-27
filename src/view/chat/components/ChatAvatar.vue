<script lang="ts" setup>

import { AirFile } from '@/airpower/helper/AirFile'

defineProps({
  url: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="avatar">
    <el-dropdown trigger="contextmenu">
      <el-image
        :src="AirFile.getStaticFileUrl(url)"
        fit="cover"
      >
        <template #error>
          <div class="image-slot">
            <i class="el-icon-picture-outline-round" />
          </div>
        </template>
      </el-image>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-postcard"
          >
            @Ta
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-postcard"
          >
            查看主页
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-circle-check"
          >
            解除限制
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-lock"
          >
            禁止发言
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-coffee-cup"
          >
            设置为副房主
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-coffee"
          >
            设置为房管
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-present"
          >
            设置为嘉宾
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-switch-button"
          >
            取消所有身份
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
  }
}
</style>
