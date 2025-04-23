import { WebEnum } from '@airpower/web'

/**
 * # 第三方登录平台
 * @author Hamm.cn
 */
export class ThirdLoginPlatform extends WebEnum {
  static readonly WECOM = new ThirdLoginPlatform(1, '企业微信')
    .setFlag('wecom')
    .setAppKey('ww4df4e5d397585277')
    .setOauthUrl(
      'https://login.work.weixin.qq.com/wwlogin/sso/login?agentid=1000090&login_type=CorpApp&appid=APP_KEY&redirect_uri=REDIRECT_URI&state=STATE',
    )

  static readonly WECHAT = new ThirdLoginPlatform(2, '微信')
    .setFlag('wechat')

  static readonly QQ = new ThirdLoginPlatform(3, 'QQ')
    .setFlag('qq')
    .setDisabled()

  static readonly WEIBO = new ThirdLoginPlatform(4, '微博')
    .setFlag('weibo')
    .setDisabled()

  static readonly DINGTALK = new ThirdLoginPlatform(5, '钉钉')
    .setFlag('dingtalk')
    .setDisabled()

  static readonly FEISHU = new ThirdLoginPlatform(6, '飞书')
    .setFlag('feishu')
    .setDisabled()

  static readonly GOOGLE = new ThirdLoginPlatform(7, '谷歌')
    .setFlag('google')
    .setDisabled()

  static readonly GITHUB = new ThirdLoginPlatform(8, 'GitHub')
    .setFlag('github')
    .setDisabled()

  static readonly GITEE = new ThirdLoginPlatform(9, 'Gitee')
    .setFlag('gitee')
    .setDisabled()

  static readonly APPLE = new ThirdLoginPlatform(10, '苹果')
    .setFlag('apple')
    .setDisabled()

  /**
   * ### 标识
   */
  flag!: string

  /**
   * ### 授权地址
   */
  oauthUrl!: string

  /**
   * ### 应用标识
   */
  appKey!: string

  /**
   * ### 宽度
   */
  width = 800

  /**
   * ### 高度
   */
  height = 750

  setFlag(flag: string): this {
    this.flag = flag
    return this
  }

  setWidth(width: number): this {
    this.width = width
    return this
  }

  setHeight(height: number): this {
    this.height = height
    return this
  }

  setAppKey(appKey: string): this {
    this.appKey = appKey
    return this
  }

  setOauthUrl(oauthUrl: string): this {
    this.oauthUrl = oauthUrl
    return this
  }
}
