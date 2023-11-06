import { defineStore } from 'pinia'

/**
 * # 全局状态管理
 * @author Hamm
 */
export const appStore = defineStore('app', {
  state: () => ({
    hello: 'World',
  }),
})
