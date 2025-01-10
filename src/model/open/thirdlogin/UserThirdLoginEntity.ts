import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 用户绑定实体
 */
export class UserThirdLoginEntity extends BaseEntity {
  /**
   * ### 验证码
   */
  thirdUserId!: string

  avatar!: string

  nickName!: string

  gender!: number

  platform!: number
}
