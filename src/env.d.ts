// / <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<unknown, unknown, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string | boolean>> {
  /**
   * ### 环境名称
   */
  VITE_APP_NAME: string

  /**
   * ### API根路径
   */
  VITE_APP_API_URL: string

  /**
   * ### Websocket URL
   */
  VITE_APP_WEBSOCKET_URL: string

  /**
   * ### Oauth2的授权地址
   */
  VITE_APP_OAUTH_URL: string

  /**
   * ### 静态资源根路径
   */
  VITE_APP_STATIC_URL: string

  /**
   * ### 是否开发模式
   */
  DEV: boolean

  /**
   * ### 是否生产模式
   */
  PROD: boolean

  /**
   * ### 当前环境模式
   */
  MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
