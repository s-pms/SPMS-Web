<script lang="ts" setup>
import PersonalToken from '@/component/user/PersonalToken.vue'
import { ADialog } from '@airpower/component'
import { airProps } from '@airpower/config/AirProps'
import { ref } from 'vue'
import ModifyPassword from './ModifyPassword.vue'
import ThirdAccountList from './ThirdAccountList.vue'

defineProps(airProps())

enum TABS {

  modifyPassword = 'modifyPassword',
  thirdAccount = 'thirdAccount',
  personalToken = 'personalToken',
}

const active = ref(TABS.modifyPassword)
</script>

<template>
  <ADialog
    :allow-fullscreen="false"
    hide-cancel
    hide-confirm
    min-height="100px"
    title="账号安全中心"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
  >
    <el-tabs
      v-model="active"
      type="card"
    >
      <el-tab-pane
        :name="TABS.modifyPassword"
        label="修改密码"
      >
        <ModifyPassword v-if="active === TABS.modifyPassword" />
      </el-tab-pane>
      <el-tab-pane
        :name="TABS.thirdAccount"
        label="社交账号"
      >
        <ThirdAccountList v-if="active === TABS.thirdAccount" />
      </el-tab-pane>
      <el-tab-pane
        :name="TABS.personalToken"
        label="私人令牌"
      >
        <PersonalToken v-if="active === TABS.personalToken" />
      </el-tab-pane>
    </el-tabs>
  </ADialog>
</template>

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
