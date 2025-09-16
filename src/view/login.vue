<script lang="ts" setup>
import Copyright from '@/component/login/Copyright.vue'
import Logo from '@/component/login/Logo.vue'
import ThirdLogin from '@/component/login/ThirdLogin.vue'
import { LoginAction } from '@/model/common/LoginAction'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'
import { FeedbackUtil, RouterUtil, ValidateUtil, WebConfig } from '@airpower/web'
import { ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'

/**
 * ### 是否二维码登录
 */
const isQrcodeLogin = ref(false)

const currentAction = ref(LoginAction.LOGIN_VIA_PASSWORD)

/**
 * ### 是否已阅读
 */
const isRead = ref(true)

const user = ref(new UserEntity())

const appKey = (RouterUtil.router.currentRoute.value.query.appKey || '').toString()
const scope = (RouterUtil.router.currentRoute.value.query.scope || '').toString()
const redirectUri = (RouterUtil.router.currentRoute.value.query.redirectUri || '/console').toString()

const appInfo = ref(new OpenAppEntity())

user.value.email = 'admin@hamm.cn'
user.value.password = 'Aa123456'

// 一些Loading状态
const isLoadingApp = ref(false)
const isLoadingLogin = ref(false)
const isEmailCodeLoading = ref(false)

// ! 判断是否输入有效格式的值
const isValidCode = computed(() => user.value.code && user.value.code.length === 6)
const isValidEmail = computed(() => user.value.email && ValidateUtil.isEmail(user.value.email))
const isValidPhone = computed(() => user.value.phone && ValidateUtil.isMobilePhone(user.value.phone))
const isValidAccount = computed(
  () => user.value.email && (ValidateUtil.isEmail(user.value.email) || ValidateUtil.isNaturalNumber(user.value.email)),
)

/**
 * ### 计算是否禁用登录/注册按钮
 */
const isButtonDisabled = computed(() => {
  switch (currentAction.value) {
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
 * ### 获取当前应用信息
 */
async function getAppInfo() {
  if (appKey) {
    user.value.appKey = appKey
    appInfo.value = await OpenAppService.create(isLoadingApp).getAppByKey(appKey)
  }
}

/**
 * ### 处理登录重定向
 */
async function loginRedirect(result: string) {
  WebConfig.saveAccessToken(result)
  if (appKey) {
    if (appInfo.value.isInternal) {
      const result = await UserService.create(isLoadingLogin).authorize(appKey, scope)
      window.location.replace(`${redirectUri}?code=${result}`)
      return
    }
    // Oauth登录 重定向code
    window.location.replace(`/authorize${window.location.search}`)
    return
  }
  // 正常登录 保存 AccessToken
  window.location.replace(redirectUri)
}

/**
 * ### 邮箱+密码登录
 */
async function onLogin() {
  const request = user.value.copy()
  if (ValidateUtil.isNumber(request.email)) {
    request.id = Number.parseInt(request.email, 10)
    request.exclude('email')
  }
  const result = await UserService.create(isLoadingLogin).login(request)
  loginRedirect(result)
}

/**
 * ### 邮箱+验证码登录
 */
async function onEmailLogin() {
  const result = await UserService.create(isLoadingLogin).loginViaEmail(user.value)
  loginRedirect(result)
}

/**
 * ### 登录/注册按钮事件
 */
async function onSubmit() {
  if (!isRead.value) {
    await ElMessageBox.confirm('请阅读并同意隐私政策以及服务条款相关内容。', '确认提示', {
      type: 'warning',
      confirmButtonText: '我已阅读并同意',
    })
    isRead.value = true
  }
  switch (currentAction.value) {
    case LoginAction.LOGIN_VIA_PASSWORD:
      onLogin()
      break
    case LoginAction.LOGIN_VIA_EMAIL:
      onEmailLogin()
      break
    default:
  }
}

/**
 * ### 发送邮箱验证码事件
 */
async function onSendEmailCode() {
  const request = new UserEntity()
  request.email = user.value.email
  await UserService.create(isEmailCodeLoading).sendEmail(request)
  FeedbackUtil.toastSuccess('邮箱验证码发送成功, 请注意查看是否被拦截')
}

async function logout() {
  WebConfig.removeAccessToken()
  await UserService.create(isLoadingLogin).logout()
}

function switchQrcodeLogin(item: LoginAction) {
  currentAction.value = item
  isQrcodeLogin.value = LoginAction.LOGIN_VIA_QRCODE === item
}

logout()
getAppInfo()
</script>

<template>
  <div class="login">
    <Logo />
    <div
      v-loading="isLoadingApp"
      class="card"
    >
      <div class="app-name">
        {{ appInfo.appName || '请先登录 SPMS!' }}
      </div>
      <div
        v-if="false"
        class="tabs"
      >
        <div
          v-for="(item, index) in [
            LoginAction.LOGIN_VIA_PASSWORD,
            LoginAction.LOGIN_VIA_EMAIL,
            LoginAction.LOGIN_VIA_PHONE,
            LoginAction.LOGIN_VIA_QRCODE,
          ]"
          :key="item"
          :class="(currentAction === item ? 'active item-' : 'item-') + index"
          class="item"
          @click=" switchQrcodeLogin(item) "
        >
          {{ item }}
        </div>
      </div>
      <div class="body">
        <template v-if="isQrcodeLogin">
          <div class="qrcode-login">
            <div class="qrcode-img">
              <img
                alt=""
                src="@/assets/img/login/qrcode.png"
              >
            </div>
            <div class="desc">
              请使用App或微信扫码登录
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-if="currentAction === LoginAction.LOGIN_VIA_PASSWORD"
            class="form"
          >
            <div class="item">
              <div
                :class="!isValidAccount ? 'error' : ''"
                class="label"
              >
                ID / 邮箱
              </div>
              <el-input
                v-model="user.email"
                type="text"
              />
            </div>
            <div class="item">
              <div class="label">
                密码
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
                :class="!ValidateUtil.isEmail(user.email) ? 'error' : ''"
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
                    :disabled="!ValidateUtil.isEmail(user.email)"
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
                :class="!ValidateUtil.isMobilePhone(user.phone) ? 'error' : ''"
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
                    :disabled="!ValidateUtil.isMobilePhone(user.phone)"
                    text
                    type="primary"
                  >
                    发送验证码
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
          <div class="rules">
            <el-checkbox v-model="isRead">
              我已阅读并同意 <a href=""> 隐私政策 </a> 以及 <a href="">服务条款</a>
            </el-checkbox>
          </div>
          <div class="button">
            <div class="submit">
              <el-button
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
      <ThirdLogin v-if="false" />
    </div>
    <Copyright />
  </div>
</template>

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
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    position: absolute;
    right: 10%;

    .qrcode-login {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;

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

    .app-name {
      font-size: 24px;
      color: #333;
    }

    .tabs {
      display: flex;
      flex-direction: row;
      margin-top: 50px;

      .item {
        position: relative;
        margin: 0 2px;
        padding: 4px 14px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
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

    .body {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 60px;
      flex: 1;
      margin-top: 50px;
      height: 0;

      .form {
        display: flex;
        flex-direction: column;
        width: 100%;

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
        margin: 20px 5px 0;

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
      margin-top: 10px;
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
        transition: all 0.3s;
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

@media screen and ((orientation: portrait) and (max-width: 600px)) {
  .login {
    .logo {
      left: auto !important;
      top: 100px !important;
    }

    .card {
      width: 90% !important;
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
      position: initial !important;
    }

    .item-3 {
      display: none;
    }
  }
}
</style>
