import { defineStore } from 'pinia'

/**
 * # 全局状态管理
 * @author Hamm.cn
 */
export const appStore = defineStore('app', {
  state: () => ({
    hello: 'World',
  }),
})
