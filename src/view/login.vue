<template>
  <div class="login">
    <div
      class="card"
    >
      <div class="logo">
        <img src="@/assets/img/logo.svg">
      </div>
      <div class="app-name">
        请先登录
      </div>
      <div class="login-form">
        <div class="tabs">
          <div
            v-for="item in [LoginAction.LOGIN_VIA_PASSWORD, LoginAction.LOGIN_VIA_PHONE, LoginAction.LOGIN_VIA_EMAIL,LoginAction.LOGIN_VIA_QRCODE]"
            :key="item"
            :class="currentAction === item ? 'active' : ''"
            class="item"
            @click="currentAction = item"
          >
            {{ item }}
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.LOGIN_VIA_PASSWORD"
          class="form"
        >
          <div class="item">
            <div
              :class="!isValidAccount ? 'error' : ''"
              class="label"
            >
              ID / 账号
            </div>
            <el-input
              v-model="user.account"
              type="text"
            />
          </div>
          <div class="item">
            <div class="label">
              你的密码
            </div>
            <el-input
              v-model="user.password"
              type="password"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.LOGIN_VIA_EMAIL"
          class="form"
        >
          <div class="item">
            <div
              :class="!AirValidator.isEmail(user.email) ? 'error' : ''"
              class="label"
            >
              你的邮箱
            </div>
            <el-input
              v-model="user.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  :disabled="!AirValidator.isEmail(user.email)"
                  :loading="isEmailCodeLoading"
                  text
                  type="primary"
                  @click="onSendEmailCode()"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              :class="!isValidCode ? 'error' : ''"
              class="label"
            >
              验证码
            </div>
            <el-input
              v-model="user.code"
              maxlength="8"
              type="text"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.LOGIN_VIA_PHONE"
          class="form"
        >
          <div class="item">
            <div
              :class="!AirValidator.isMobilePhone(user.phone) ? 'error' : ''"
              class="label"
            >
              手机号
            </div>
            <el-input
              v-model="user.phone"
              type="text"
            >
              <template #suffix>
                <el-button
                  :disabled="!AirValidator.isMobilePhone(user.phone)"
                  text
                  type="primary"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              :class="!isValidCode ? 'error' : ''"
              class="label"
            >
              验证码
            </div>
            <el-input
              v-model="user.code"
              maxlength="8"
              type="text"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.REGISTER_VIA_EMAIL"
          class="form"
        >
          <div class="item">
            <div
              :class="!AirValidator.isEmail(user.email) ? 'error' : ''"
              class="label"
            >
              邮箱
            </div>
            <el-input
              v-model="user.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  :disabled="!AirValidator.isEmail(user.email)"
                  :loading="isEmailCodeLoading"
                  text
                  type="primary"
                  @click="onSendEmailCode()"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              :class="!isValidCode ? 'error' : ''"
              class="label"
            >
              验证码
            </div>
            <el-input
              v-model="user.code"
              maxlength="8"
              type="text"
            />
          </div>
          <div class="item">
            <div
              :class="!isValidPassword ? 'error' : ''"
              class="label"
            >
              你的密码
            </div>
            <el-input
              v-model="user.password"
              type="password"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.LOGIN_VIA_QRCODE"
          class="qrcode-login"
        >
          <div class="qrcode-img">
            <img src="@/assets/img/login/qrcode.png">
          </div>
          <div class="desc">
            请使用小程序或App扫码登录
          </div>
        </div>
        <template v-else>
          <div class="rules">
            <el-checkbox v-model="isRead">
              我已阅读并同意 <a href="">
                隐私政策
              </a> 以及 <a href="">
                服务条款
              </a>
            </el-checkbox>
          </div>
          <div class="button">
            <div class="submit">
              <el-button
                v-if="LoginAction.REGISTER_VIA_EMAIL === currentAction"
                :disabled="isButtonDisabled"
                :loading="isLoadingReg"
                type="primary"
                @click="onSubmit()"
              >
                注册账号
              </el-button>
              <el-button
                v-else
                :disabled="isButtonDisabled"
                :loading="isLoadingLogin"
                type="primary"
                @click="onSubmit()"
              >
                立即登录
              </el-button>
            </div>
          </div>
        </template>
      </div>
      <div
        v-if="false"
        class="link"
      >
        <a href="">企业微信</a>
        <a href="">钉钉</a>
        <a href="">飞书</a>
        <a href="">ERP账号</a>
      </div>
    </div>
    <div class="copyright">
      Copyright Hamm.cn &copy;{{ new Date().getFullYear() }}, All Rights Reserved.
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { LoginAction } from '@/model/common/LoginAction'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { UserService } from '@/model/personnel/user/UserService'
import { UserEntity } from '@/model/personnel/user/UserEntity'

const currentAction = ref(LoginAction.LOGIN_VIA_PASSWORD)

/**
 * # 是否已阅读
 */
const isRead = ref(true)

const user = ref(new UserEntity())

const appKey = (AirRouter.router.currentRoute.value.query.appKey || '').toString()
const redirectUri = (AirRouter.router.currentRoute.value.query.redirectUri || '/console').toString()

user.value.email = 'admin@hamm.cn'
user.value.phone = '17666666666'
user.value.account = 'hamm'
user.value.password = 'Aa123456'

// 一些Loading状态
const isLoadingLogin = ref(false)
const isLoadingReg = ref(false)
const isEmailCodeLoading = ref(false)

// ! 判断是否输入有效格式的值
const isValidPassword = computed(() => user.value.password && user.value.password.length >= 6)
const isValidCode = computed(() => user.value.code && user.value.code.length === 6)
const isValidEmail = computed(() => user.value.email && AirValidator.isEmail(user.value.email))
const isValidPhone = computed(() => user.value.phone && AirValidator.isMobilePhone(user.value.phone))
const isValidAccount = computed(() => user.value.account)

/**
 * # 计算是否禁用登录/注册按钮
 */
const isButtonDisabled = computed(() => {
  switch (currentAction.value) {
    case LoginAction.REGISTER_VIA_EMAIL:
      return !isValidEmail.value || !isValidCode.value || !isValidPassword.value
    case LoginAction.LOGIN_VIA_PHONE:
      return !isValidPhone.value || !isValidCode.value
    case LoginAction.LOGIN_VIA_EMAIL:
      return !isValidEmail.value || !isValidCode.value
    case LoginAction.LOGIN_VIA_PASSWORD:
      return !user.value.password || !isValidAccount.value
    default:
      return true
  }
})

/**
 * # 处理登录重定向
 */
function loginRedirect(result: string) {
  if (appKey) {
    // Oauth登录 重定向code
    // eslint-disable-next-line no-restricted-globals
    location.href = `${decodeURIComponent(redirectUri)}?code=${result}`
    return
  }
  AirConfig.saveAccessToken(result)
  // 正常登录 保存 AccessToken
  // eslint-disable-next-line no-restricted-globals
  location.href = redirectUri
}

/**
 * # 邮箱+密码登录
 */
async function onLogin() {
  const request = user.value.copy()
  if (AirValidator.isNumber(request.email)) {
    request.id = parseInt(request.email, 10)
    request.exclude('email')
  }
  const result = await UserService.create(isLoadingLogin)
    .login(request)
  loginRedirect(result)
}

/**
 * # 邮箱+验证码登录
 */
async function onEmailLogin() {
  const result = await UserService.create(isLoadingLogin)
    .loginViaEmail(user.value)
  loginRedirect(result)
}

/**
 * # 注册
 */
async function onReg() {
  // eslint-disable-next-line no-case-declarations
  await UserService.create(isLoadingLogin)
    .register(user.value)
  AirAlert.create()
    .setConfirmText('去登录')
    .show('账号注册成功, 你可以使用账号密码去登录了!')
  currentAction.value = LoginAction.LOGIN_VIA_PASSWORD
}

/**
 * # 登录/注册按钮事件
 */
async function onSubmit() {
  if (!isRead.value) {
    await AirConfirm.create()
      .setConfirmText('我已阅读并同意')
      .show('请阅读并同意隐私政策以及服务条款相关内容。', '确认提示')
    isRead.value = true
  }
  switch (currentAction.value) {
    case LoginAction.LOGIN_VIA_PASSWORD:
      onLogin()
      break
    case LoginAction.REGISTER_VIA_EMAIL:
      onReg()
      break
    case LoginAction.LOGIN_VIA_EMAIL:
      onEmailLogin()
      break
    default:
  }
}

/**
 * # 发送邮箱验证码事件
 */
async function onSendEmailCode() {
  const request = new UserEntity()
  request.email = user.value.email
  await UserService.create(isEmailCodeLoading)
    .sendMail(request)
  AirNotification.success('邮箱验证码发送成功, 请注意查看是否被拦截')
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white url(@/assets/img/login/bg.jpg) no-repeat bottom center;
  background-size: cover;
  align-items: center;
  justify-content: center;

  .card {
    overflow: hidden;
    background-color: rgba($color: #f5f5f5, $alpha: 0.5);
    box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .qrcode-login {
      text-align: center;
      margin-top: 25px;

      .qrcode-img {
        background-color: rgba($color: #fff, $alpha: 0.9);
        padding: 10px;
        border-radius: 10px;
        font-size: 0;
        display: inline-block;

        img {
          width: 200px;
          height: 200px;
        }
      }

      .desc {
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        color: #999;
      }
    }

    .logo {
      height: 80px;
      padding: 10px;
      background-color: rgba($color: #fff, $alpha: 0.1);
      border-radius: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .app-name {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-top: 20px;
    }

    .tabs {
      display: flex;
      flex-direction: row;
      margin-top: 30px;

      .item {
        position: relative;
        margin: 0 4px;
        padding: 4px 16px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all .3s;
        color: #333;
      }

      .item:hover {
        background-color: #fff;
      }

      .active {
        background-color: white;
        cursor: default;
        color: var(--primary-color);
      }

      .active:hover {
        background-color: white;
      }
    }

    .login-form {
      height: 340px;

      .form {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px 0 10px 0;

        .item {
          height: 50px;
          background-color: white;
          margin: 5px 0;
          font-size: 14px;
          border-radius: 10px;
          overflow: hidden;
          padding: 10px 20px;

          .label {
            color: #999;
          }

          .error {
            color: red;
          }
        }
      }

      .button {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 20px;

        .submit {
          width: 100%;
          flex: 1;

          .el-button {
            padding: 20px;
            width: 100%;
          }
        }
      }

    }

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-top: 20px;

      a {
        margin: 0 5px;
        text-decoration: none;
        color: #333;
        transition: all .3s;
      }

      a:hover {
        color: var(--primary-color);
        text-decoration: underline;
      }
    }

    .rules {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      a {
        text-decoration: none;
        color: #000;
        transition: all .3s;
      }

      a:hover {
        text-decoration: underline;
        color: var(--primary-color);
      }

      ::v-deep(.el-checkbox__label) {
        font-weight: normal;
      }
    }

    ::v-deep(.el-input) {
      border: none;

      .el-input__wrapper {
        box-shadow: none;
        padding: 0;

        .el-button {
          margin-right: -10px;
        }
      }

      .el-input__inner {
        color: #000;
        font-size: 16px;
      }
    }
  }
}

.copyright {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 20px;
  text-align: center;
  color: #aaa;
  font-size: 12px;
  text-shadow: 0 1px 1px rgba($color: #fff, $alpha: 1);
}

@media screen and ((orientation:portrait) and (max-width: 600px)) {
  .login {
    .card {
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
    }
  }
}
</style>
