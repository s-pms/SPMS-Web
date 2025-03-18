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
    <ATabs>
      <ATab label="修改密码">
        <ModifyPassword />
      </ATab>
      <ATab label="社交账号">
        <ThirdAccountList />
      </ATab>
    </ATabs>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, ATab, ATabs } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'
import ModifyPassword from './ModifyPassword.vue'
import ThirdAccountList from './ThirdAccountList.vue'

defineProps(airProps())

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
