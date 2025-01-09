<template>
  <ADialog
    :allow-fullscreen="false"
    :disable-confirm="!app.appKey || !app.appSecret || !app.arithmetic || (OpenAppArithmeticEnum.RSA.equalsKey(app.arithmetic) && !app.publicKey)"
    :loading="isLoading"
    title="测试应用"
    with="1000px"
    @on-confirm="onTest"
    @on-cancel="onCancel"
  >
    <el-form
      ref="formRef"
      :model="app"
      label-width="120px"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="应用信息"
      >
        <AFormField
          v-model="app"
          :entity="OpenAppEntity"
          field="appKey"
        />
        <AFormField
          v-model="app"
          :entity="OpenAppEntity"
          field="appSecret"
        />
        <AFormField
          v-model="app"
          :entity="OpenAppEntity"
          :list="OpenAppArithmeticEnum.toArray().map(item => {
            if (OpenAppArithmeticEnum.RSA.equalsKey(item.key)) {
              item.disabled = true
            }
            return item
          })"
          field="arithmetic"
        />
        <el-form-item label="版本号">
          <el-input
            v-model="version"
            readonly
          />
        </el-form-item>
        <el-form-item label="时间戳">
          <el-input v-model="timestamp">
            <template #append>
              <el-button @click="timestamp = new Date().valueOf()">
                重置
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="随机串">
          <el-input v-model="nonce">
            <template #append>
              <el-button @click="nonce = AirRand.getRandMixedCharString()">
                重置
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div />
        <template v-if="OpenAppArithmeticEnum.RSA.equalsKey(app.arithmetic)">
          <AFormField
            v-model="app"
            :entity="OpenAppEntity"
            field="publicKey"
          />
        </template>
      </AGroup>
      <AGroup title="业务数据">
        <el-form-item label="URL">
          <el-input
            v-model="url"
            placeholder="请输入请求的URL"
          />
        </el-form-item>
        <el-form-item label="业务数据">
          <el-input
            v-model="json"
            placeholder="请求的业务数据JSON"
            type="textarea"
          />
        </el-form-item>
      </AGroup>
      <AGroup title="验证">
        <el-form-item label="签名元数据">
          <div class="source">
            <font class="appSecret">
              {{ app.appSecret }}
            </font>
            <font class="appKey">
              {{ app.appKey }}
            </font>
            <font class="version">
              {{ version }}
            </font>
            <font class="timestamp">
              {{ timestamp }}
            </font>
            <font class="nonce">
              {{ nonce }}
            </font>
            <font class="content">
              {{ content }}
            </font>
          </div>
        </el-form-item>
        <el-form-item label="签名">
          <el-input
            v-model="signature"
            readonly
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="加密数据">
          <el-input
            v-model="content"
            readonly
            type="textarea"
          />
        </el-form-item>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ADialog, AFormField, AGroup } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { AirCrypto } from '@/airpower/helper/AirCrypto'
import { AirHttp } from '@/airpower/helper/AirHttp'
import { OpenAppArithmeticEnum } from '@/model/open/app/OpenAppArithmeticEnum'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AirRand } from '@/airpower/helper/AirRand'

import { AirApi } from '@/airpower/config/AirApi'

const props = defineProps(airPropsParam())

const app = ref(new OpenAppEntity())
app.value.appKey = ''
app.value.appSecret = ''

const isLoading = ref(false)

const json = ref('{"name":"Hamm","age":"18","len":"18cm"}')

const version = 10000

const APP_KEY = 'APP_KEY_TEST'
const APP_SECRET = 'APP_SECRET_TEST'

const timestamp = ref(new Date().valueOf())

const url = ref('openApi/test/test')

const nonce = ref(AirRand.getRandMixedCharString())

if (OpenAppArithmeticEnum.RSA.equalsKey(app.value.arithmetic)) {
  AirAlert.warning('前端暂未支持RSA加解密的测试，请自行测试')
  props.onCancel()
}

app.value.appKey = AirApi.getStorage(APP_KEY) || ''
app.value.appSecret = AirApi.getStorage(APP_SECRET) || ''

const content = computed(() => {
  AirApi.setStorage(APP_KEY, app.value.appKey)
  AirApi.setStorage(APP_SECRET, app.value.appSecret)
  switch (app.value.arithmetic) {
    case OpenAppArithmeticEnum.AES.key:
      if (!app.value.appSecret) {
        return ''
      }
      return AirCrypto.aesEncrypt(json.value, app.value.appSecret)
    default:
      return json.value
  }
})
const source = computed(() => app.value.appSecret + app.value.appKey + version + timestamp.value + nonce.value + content.value)
const signature = computed(() => AirCrypto.sha1(source.value))

async function onTest() {
  const res = await new AirHttp(`${window.location.origin}/api/${url.value}`).send({
    appKey: app.value.appKey,
    content: content.value,
    signature: signature.value,
    version,
    timestamp: timestamp.value,
    nonce: nonce.value,
  })

  AirRand.getRandCharString()
  const data = AirCrypto.aesDecrypt(res, app.value.appSecret)
  AirAlert.success(data, '响应数据')
}
</script>

<style lang="scss" scoped>
.source {
  > font {
    margin: 0 3px;
  }

  .appKey,
  .timestamp,
  .content {
    color: red;
  }
}
</style>
