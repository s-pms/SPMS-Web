import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { OauthScope } from '@/model/open/oauth/OauthScope'
import { OauthCreateCodeRequest } from '@/model/open/oauth/OauthCreateCodeRequest'
import { ThirdLoginRequest } from '@/model/open/thirdlogin/ThirdLoginRequest'
import { UserThirdLoginEntity } from '@/model/open/thirdlogin/UserThirdLoginEntity'

/**
 * # 用户服务接口
 */
export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

  async logout() {
    await this.api('logout')
      .post()
  }

  /**
   * ### App登录
   * @param user 用户
   */
  async login(user: UserEntity): Promise<string> {
    const result = await this.api('login')
      .post(user)
    return result as unknown as string
  }

  /**
   * ### 发送验证码
   * @param user 用户
   */
  async sendEmail(user: UserEntity): Promise<void> {
    await this.api('sendEmail')
      .setTimeout(10000)
      .post(user)
  }

  /**
   * ### 邮箱验证码登录
   * @param user 用户
   */
  async loginViaEmail(user: UserEntity): Promise<string> {
    const result = await this.api('loginViaEmail')
      .post(user)
    return result as unknown as string
  }

  /**
   * ### 重置密码
   * @param user 用户
   */
  async resetMyPassword(user: UserEntity): Promise<void> {
    await this.api('resetMyPassword')
      .post(user)
  }

  /**
   * ### 修改密码
   * @param user 用户
   */
  async updateMyPassword(user: UserEntity): Promise<void> {
    await this.api('updateMyPassword')
      .post(user)
  }

  /**
   * ### 获取我有权限的菜单列表
   */
  async getMyMenuList(): Promise<MenuEntity[]> {
    return this.api('getMyMenuList')
      .requestArray(undefined, MenuEntity)
  }

  /**
   * ### 获取我的权限列表
   */
  async getMyPermissionList(): Promise<string[]> {
    const arr = await this.api('getMyPermissionList')
      .post()
    return arr as string[]
  }

  /**
   * ### 获取我的三方账号
   */
  async getMyThirdList(): Promise<UserThirdLoginEntity[]> {
    return this.api('getMyThirdList')
      .requestArray(undefined, UserThirdLoginEntity)
  }

  /**
   * ### 获取我的个人信息
   */
  async getMyInfo(): Promise<UserEntity> {
    return this.api('getMyInfo')
      .request(undefined, UserEntity)
  }

  async getScopeList(): Promise<OauthScope[]> {
    return this.api('getScopeList', 'oauth2')
      .requestArray(undefined, OauthScope)
  }

  async authorize(appKey: string, scope: string): Promise<string> {
    const postData = new OauthCreateCodeRequest()
    postData.appKey = appKey
    postData.scope = scope
    const code = await this.api('createCode', 'oauth2')
      .post(postData)
    return code as unknown as string
  }

  async callbackCode(platform: string, code: string): Promise<string> {
    const postData = new ThirdLoginRequest()
    postData.platform = platform
    postData.code = code
    const result = await this.api('callback', 'oauth2')
      .callbackError()
      .post(postData)
    return result as unknown as string
  }

  async thirdBind(platform: string, code: string): Promise<void> {
    const postData = new ThirdLoginRequest()
    postData.platform = platform
    postData.code = code
    await this.api('thirdBind', 'oauth2')
      .callbackError()
      .post(postData)
  }

  async unBindThird(data: UserThirdLoginEntity): Promise<void> {
    await this.api('unBindThird', 'oauth2')
      .callbackError()
      .post(data)
  }

  async updateMyInfo(user: UserEntity) {
    await this.api('updateMyInfo')
      .post(user)
  }
}
