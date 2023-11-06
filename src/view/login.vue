<template>
  <div class="login">
    <div
      v-loading="isLoadingApp"
      class="card"
      :style="{ width: isQrcodeLogin ? 'auto' : '400px' }"
    >
      <div class="logo">
        <img src="@/assets/img/logo.png">
      </div>
      <div class="app-name">
        {{ appInfo.appName }}
      </div>
      <template v-if="isQrcodeLogin">
        <div class="qrcode-login">
          <div class="qrcode-img">
            <img src="@/assets/img/login/qrcode.png">
          </div>
          <div class="desc">
            请使用App或微信扫码登录
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tabs">
          <div
            v-for="item in [LoginAction.LOGIN_VIA_PASSWORD, LoginAction.LOGIN_VIA_EMAIL, LoginAction.REGISTER_VIA_EMAIL]"
            :key="item"
            class="item"
            :class="currentAction === item ? 'active' : ''"
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
              class="label"
              :class="!isValidAccount ? 'error' : ''"
            >
              ID / 邮箱
            </div>
            <el-input
              v-model="requestVo.email"
              type="text"
            />
          </div>
          <div class="item">
            <div class="label">
              你的密码
            </div>
            <el-input
              v-model="requestVo.password"
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
              class="label"
              :class="!AirValidator.isEmail(requestVo.email) ? 'error' : ''"
            >
              你的邮箱
            </div>
            <el-input
              v-model="requestVo.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                  :disabled="!AirValidator.isEmail(requestVo.email)"
                  :loading="isEmailCodeLoading"
                  @click="onSendEmailCode()"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              class="label"
              :class="!isValidCode ? 'error' : ''"
            >
              验证码
            </div>
            <el-input
              v-model="requestVo.code"
              type="text"
              maxlength="8"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.LOGIN_VIA_PHONE"
          class="form"
        >
          <div class="item">
            <div
              class="label"
              :class="!AirValidator.isMobilePhone(requestVo.phone) ? 'error' : ''"
            >
              手机号
            </div>
            <el-input
              v-model="requestVo.phone"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                  :disabled="!AirValidator.isMobilePhone(requestVo.phone)"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              class="label"
              :class="!isValidCode ? 'error' : ''"
            >
              验证码
            </div>
            <el-input
              v-model="requestVo.code"
              type="text"
              maxlength="8"
            />
          </div>
        </div>
        <div
          v-if="currentAction === LoginAction.REGISTER_VIA_EMAIL"
          class="form"
        >
          <div class="item">
            <div
              class="label"
              :class="!AirValidator.isEmail(requestVo.email) ? 'error' : ''"
            >
              邮箱
            </div>
            <el-input
              v-model="requestVo.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                  :disabled="!AirValidator.isEmail(requestVo.email)"
                  :loading="isEmailCodeLoading"
                  @click="onSendEmailCode()"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div
              class="label"
              :class="!isValidCode ? 'error' : ''"
            >
              验证码
            </div>
            <el-input
              v-model="requestVo.code"
              type="text"
              maxlength="8"
            />
          </div>
          <div class="item">
            <div
              class="label"
              :class="!isValidPassword ? 'error' : ''"
            >
              你的密码
            </div>
            <el-input
              v-model="requestVo.password"
              type="password"
            />
          </div>
        </div>
        <div class="rules">
          <el-checkbox v-model="isReaded">
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
              :loading="isLoadingReg"
              type="primary"
              :disabled="isButtonDisabled"
              @click="onSubmit()"
            >
              注册账号
            </el-button>
            <el-button
              v-else
              :loading="isLoadingLogin"
              type="primary"
              :disabled="isButtonDisabled"
              @click="onSubmit()"
            >
              立即登录
            </el-button>
          </div>
        </div>
      </template>
      <div
        v-if="false"
        class="link"
      >
        <a
          href="#"
          @click="isQrcodeLogin = !isQrcodeLogin"
        >
          {{ isQrcodeLogin ? '普通登录' : '扫码登录' }}
        </a>
        <a href="">钉钉登录</a>
        <a href="">企业微信登录</a>
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
import { UserRequestVo } from '@/model/user/UserRequestVo'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { UserService } from '@/model/user/UserService'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AppEntity } from '@/model/app/AppEntity'
import { AppService } from '@/model/app/AppService'
import { MailService } from '@/model/mail/MailService'

/**
 * # 是否二维码登录
 */
const isQrcodeLogin = ref(false)

const currentAction = ref(LoginAction.LOGIN_VIA_PASSWORD)

/**
 * # 是否已阅读
 */
const isReaded = ref(true)

const requestVo = ref(new UserRequestVo())

const appKey = (AirConfig.router.currentRoute.value.query.appKey || '').toString()
const redirectUri = (AirConfig.router.currentRoute.value.query.redirectUri || '/console').toString()

const appInfo = ref(new AppEntity())

requestVo.value.email = 'admin@hamm.cn'
requestVo.value.password = 'Aa123456'

// 一些Loading状态
const isLoadingApp = ref(false)
const isLoadingLogin = ref(false)
const isLoadingReg = ref(false)
const isEmailCodeLoading = ref(false)

// ! 判断是否输入有效格式的值
const isValidPassword = computed(() => requestVo.value.password && requestVo.value.password.length >= 6)
const isValidCode = computed(() => requestVo.value.code && requestVo.value.code.length === 6)
const isValidEmail = computed(() => requestVo.value.email && AirValidator.isEmail(requestVo.value.email))
const isValidPhone = computed(() => requestVo.value.phone && AirValidator.isMobilePhone(requestVo.value.phone))
const isValidAccount = computed(() => requestVo.value.email && (AirValidator.isEmail(requestVo.value.email) || AirValidator.isNaturalNumber(requestVo.value.email)))

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
      return !requestVo.value.password || !isValidAccount.value
    default:
      return true
  }
})

/**
 * # 获取当前应用信息
 */
async function getAppInfo() {
  if (appKey) {
    requestVo.value.appKey = appKey
    appInfo.value = await AppService.create(isLoadingApp).getAppByKey(appKey)
  }
}

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
  AirConfig.saveAccessToken(result as string)
  // 正常登录 保存 AccessToken
  // eslint-disable-next-line no-restricted-globals
  location.href = redirectUri
}

/**
 * # 邮箱+密码登录
 */
async function onLogin() {
  const request = requestVo.value.copy()
  if (AirValidator.isNumber(request.email)) {
    request.id = parseInt(request.email, 10)
    request.exclude('email')
  }
  const result = await UserService.create(isLoadingLogin).login(request)
  loginRedirect(result)
}

/**
 * # 邮箱+验证码登录
 */
async function onEmailLogin() {
  const result = await UserService.create(isLoadingLogin).loginViaEmail(requestVo.value)
  loginRedirect(result)
}

/**
 * # 注册
 */
async function onReg() {
  // eslint-disable-next-line no-case-declarations
  await UserService.create(isLoadingLogin).register(requestVo.value)
  AirAlert.create().setConfirmText('去登录').show('账号注册成功, 你可以使用账号密码去登录了!')
  currentAction.value = LoginAction.LOGIN_VIA_PASSWORD
}

/**
 * # 登录/注册按钮事件
 */
async function onSubmit() {
  if (!isReaded.value) {
    await AirConfirm.create().setConfirmText('我已阅读并同意').show('请阅读并同意隐私政策以及服务条款相关内容。', '确认提示')
    isReaded.value = true
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
  const request = new UserRequestVo()
  request.email = requestVo.value.email
  await MailService.create(isEmailCodeLoading).sendCode(request)
  AirNotification.success('邮箱验证码发送成功, 请注意查看是否被拦截')
}

getAppInfo()
</script>
<style scoped lang="scss">
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
      margin: 30px 0px;
      padding: 0px 60px;

      .qrcode-img {
        background-color: rgba($color: #fff, $alpha: 0.9);
        padding: 10px;
        border-radius: 10px;
        font-size: 0;

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

      width: 80px;
      height: 80px;
      padding: 10px;
      background-color: rgba($color: #fff, $alpha: 0.1);
      border-radius: 20px;
      box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);

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
        margin: 0px 4px;
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

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 60px;

      .item {
        height: 50px;
        background-color: white;
        margin: 5px;
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
      padding: 0px 40px;
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

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-top: 20px;

      a {
        margin: 0px 5px;
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
        padding: 0px;

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
  text-shadow: 0px 1px 1px rgba($color: #fff, $alpha: 1);
}

@media screen and ((orientation:portrait) and (max-width: 600px)) {
  .login {
    .card {
      width: 90% !important;
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
    }
  }
}
</style>
