<script lang="ts" setup>
import type { PersonalTokenEntity } from '@/model/personnel/user/token/PersonalTokenEntity'
import { AButton, AEmpty, DateTimeFormatter, DialogProps, FeedbackUtil } from '@airpower/web'

import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { UserService } from '@/model/personnel/user/UserService'

defineProps(DialogProps.create())

const list = ref([] as PersonalTokenEntity[])

const isLoading = ref(false)

const name = ref('')

async function init() {
  list.value = await UserService.create(isLoading).getMyPersonalTokenList()
}

async function createMyPersonalToken() {
  await FeedbackUtil.confirmWarning('是否确认创建新的私人令牌？', '创建确认')
  const token = await UserService.create(isLoading).createMyPersonalToken(name.value)

  await ElMessageBox.alert('创建私人令牌成功，请点击复制，后续将不再显示令牌！', '创建成功', {
    confirmButtonText: '点击复制',
    closeOnPressEscape: false,
    type: 'success',
    showClose: false,
  })
  await useClipboard().toClipboard(token)
  FeedbackUtil.toastSuccess('已经成功复制到你的剪切板')
  name.value = ''
  init()
}

async function onDisableOrEnable(item: PersonalTokenEntity) {
  await FeedbackUtil.confirmWarning(`是否确认${item.isDisabled ? '启用' : '禁用'}这个私人令牌？`, `${item.isDisabled ? '启用' : '禁用'}`)
  const service = UserService.create(isLoading)
  await (item.isDisabled ? service.enableMyPersonalToken(item) : service.disableMyPersonalToken(item))
  init()
}

init()
</script>

<template>
  <div class="personal-token">
    <div class="new">
      <el-input v-model="name" placeholder="请输入令牌名称..." />
      <AButton :disabled="!name" primary type="ADD" @click="createMyPersonalToken()">
        创建令牌
      </AButton>
    </div>
    <div v-loading="isLoading" class="main">
      <div v-for="item in list" :key="item.id" class="list">
        <div class="item">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="token">
            {{ item.token }}
          </div>
          <div class="status">
            <el-switch
              :active-value="false" :inactive-value="true" :model-value="item.isDisabled"
              @click="onDisableOrEnable(item)"
            />
          </div>
          <div class="create-time">
            创建于: {{ DateTimeFormatter.FULL_DATE_TIME.formatMilliSecond(item.createTime) }}
          </div>
        </div>
      </div>
      <AEmpty v-if="list.length === 0">
        没有创建任何身份令牌
      </AEmpty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-token {
  .new {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;

    .el-button {
      margin-left: 10px;
    }
  }

  .main {
    min-height: 300px;
    position: relative;

    .list {
      margin-top: 10px;

      .item {
        padding: 10px;
        background-color: #f5f5f5;
        margin: 5px 0;
        border-radius: 10px;
        position: relative;

        .token {
          color: #999;
          font-size: 14px;
          margin-top: 5px;
        }

        .create-time,
        .status {
          color: #999;
          font-size: 12px;
        }

        .create-time {
          margin-top: 10px;
        }

        .status {
          position: absolute;
          right: 10px;
          top: 10px;
          color: #67c23a;
        }

        .disabled {
          color: #f00;
        }
      }
    }
  }
}
</style>
