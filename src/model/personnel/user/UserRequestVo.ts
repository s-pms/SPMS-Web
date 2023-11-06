import { UserEntity } from './UserEntity'

export class UserRequestVo extends UserEntity {
  /**
   * # 验证码
   */
  code!: string

  /**
   * # 所属应用AppKey
   */
  appKey!: string
}
