import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { UserEntity } from './UserEntity'

/**
 * # 用户服务接口
 */
export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

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
   * ### 邮箱验证码登录
   * @param user 用户
   */
  async loginViaEmail(user: UserEntity): Promise<string> {
    const result = await this.api('loginViaEmail')
      .post(user)
    return result as unknown as string
  }

  /**
   * ### 注册
   * @param user 用户
   */
  async register(user: UserEntity): Promise<void> {
    await this.api('register')
      .post(user)
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
   * ### 获取我的个人信息
   */
  async getMyInfo(): Promise<UserEntity> {
    return this.api('getMyInfo')
      .request(undefined, UserEntity)
  }

  /**
   * ### 发送验证码
   * @param user 用户
   */
  async sendMail(user: UserEntity): Promise<void> {
    await this.api('sendMail')
      .setTimeout(10000)
      .post(user)
  }
}
