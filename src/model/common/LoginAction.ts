/**
 * # 登录方式枚举
 * @author Hamm.cn
 */
export enum LoginAction {
  /**
   * ### 账号密码登录
   */
  LOGIN_VIA_PASSWORD = '密码登录',

  /**
   * ### 邮箱验证码登录
   */
  LOGIN_VIA_EMAIL = '邮箱登录',

  /**
   * ### 手机短信验证码登录
   */
  LOGIN_VIA_PHONE = '手机登录',

  /**
   * ### 扫码登录
   */
  LOGIN_VIA_QRCODE = '扫码登录',

  /**
   * ### 第三方登录
   */
  LOGIN_VIA_THIRD_PARTY = '第三方登录',

  /**
   * ### 注册账号
   */
  REGISTER_VIA_EMAIL = '注册账号',
}
