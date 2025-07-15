<script lang="ts" setup>
import type { FileEntity } from '@/model/system/file/FileEntity'
import {AImage, AUser, DesensitizeType, DialogUtil} from '@airpower/web'
import {ref} from 'vue'
import { AppConfig } from '@/config/AppConfig'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { FileCategory } from '@/model/system/file/FileCategory'
import UserAccount from './user/UserAccount.vue'

defineProps({
  user: {
    type: UserEntity,
    required: true,
  },
})

function onUserAccount() {
  DialogUtil.show(UserAccount)
}

const isLoading = ref(false)

async function onUploadAvatar(file: FileEntity) {
  AppConfig.currentUser.value = await UserService.create(isLoading).getMyInfo()
  AppConfig.currentUser.value.avatar = file.url
  await UserService.create(isLoading).updateMyInfo(AppConfig.currentUser.value)
  AppConfig.currentUser.value = await UserService.create(isLoading).getMyInfo()
}
</script>

<template>
  <AUser
    :height="200"
    :user="user"
  >
    <div class="user">
      <div class="user-left">
        <AImage
          v-loading="isLoading"
          :data="{
            category: FileCategory.AVATAR.key,
          }"
          :height="80"
          :width="80"
          upload
          @upload="onUploadAvatar"
        />
        <div
          :class="user.gender === 1 ? 'male' : 'female'"
          class="gender"
        >
          {{ user.gender === 1 ? '男' : '女' }}
        </div>
      </div>
      <div class="user-right">
        <div class="info">
          <div class="item">
            <div class="key">
              实名
            </div>
            <div class="value">
              <template v-if="user.idCard">
                {{ DesensitizeType.CHINESE_NAME.desensitize(user.realName) }}
              </template>
              <el-link v-else>
                去实名
              </el-link>
            </div>
          </div>
          <div class="item">
            <div class="key">
              邮箱
            </div>
            <div class="value">
              <template v-if="user.email">
                {{ DesensitizeType.EMAIL.desensitize(user.email) }}
                <a>更换</a>
              </template>
              <a v-else> 绑定邮箱 </a>
            </div>
          </div>
          <div class="item">
            <div class="key">
              手机
            </div>
            <div class="value">
              <template v-if="user.phone">
                {{ DesensitizeType.MOBILE.desensitize(user.phone) }}
                <a>更换</a>
              </template>
              <a v-else> 绑定手机 </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting">
      <div
        class="item"
        @click="onUserAccount()"
      >
        账号安全
      </div>
      <div class="item">
        我的设置
      </div>
      <div class="item">
        我的设置
      </div>
      <div class="item">
        我的设置
      </div>
    </div>
  </AUser>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &-left {
    margin-right: 20px;
    position: relative;

    ::v-deep(.el-image) {
      width: 80px;
      height: 80px;
      background: #f5f5f5;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .gender {
      position: absolute;
      right: -7px;
      bottom: 0;
      color: white;
      border-radius: 5px;
      font-size: 12px;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 15px;
    }

    .male {
      background-color: #409eff;
    }

    .female {
      background-color: #f56c6c;
    }
  }

  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        color: #999;
        padding: 3px 0;

        .key {
          width: 50px;
        }

        .value {
          color: #666;
        }

        a {
          color: var(--primary-color);
        }
      }
    }
  }
}

.setting {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin: 10px -5px 0 -5px;
  color: #999;

  .item {
    flex: 1;
    font-size: 12px;
    background-color: #f5f5f5;
    margin: 0 5px;
    text-align: center;
    padding: 7px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
  }

  .item:hover {
    background-color: #e5e5e5;
  }
}
</style>
