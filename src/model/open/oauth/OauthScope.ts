import { Transformer } from '@airpower/web'

/**
 * # 授权范围
 * @author Hamm.cn
 */
export class OauthScope extends Transformer {
  /**
   * ### 是否默认
   */
  isDefault!: boolean

  /**
   * ### 名称
   */
  name!: string

  /**
   * ### 标题
   */
  label!: string

  /**
   * ### 描述
   */
  description!: string
}
