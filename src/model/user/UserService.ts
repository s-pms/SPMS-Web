import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UserEntity } from '@/model/user/UserEntity'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'

/**
 * # 用户服务接口
 */
export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

  /**
   * # App登录
   * @param user 用户
   */
  async login(user: UserEntity): Promise<string> {
    const result = await this.api('login').post(user)
    return result as unknown as string
  }

  /**
   * # 邮箱验证码登录
   * @param user 用户
   */
  async loginViaEmail(user: UserEntity): Promise<string> {
    const result = await this.api('loginViaEmail').post(user)
    return result as unknown as string
  }

  /**
   * # 注册
   * @param user 用户
   */
  async register(user: UserEntity): Promise<void> {
    await this.api('register').post(user)
  }

  /**
   * # 重置密码
   * @param user 用户
   */
  async resetMyPassword(user: UserEntity): Promise<void> {
    await this.api('resetMyPassword').post(user)
  }

  /**
   * # 获取我有权限的菜单列表
   */
  async getMyMenuList(): Promise<MenuEntity[]> {
    const jsonArray = await this.api('getMyMenuList').post()
    return MenuEntity.fromJsonArray(jsonArray)
  }

  /**
   * # 获取我d的权限列表
   */
  async getMyPermissionList(): Promise<PermissionEntity[]> {
    const jsonArray = await this.api('getMyPermissionList').post()
    return PermissionEntity.fromJsonArray(jsonArray)
  }

  /**
   * # 获取我的个人信息
   */
  async getMyInfo(): Promise<UserEntity> {
    const json = await this.api('getMyInfo').post()
    return UserEntity.fromJson(json)
  }
}
