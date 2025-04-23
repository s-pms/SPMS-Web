import { Transformer } from '@airpower/web'

/**
 * # Oauth 创建授权码 请求
 * @author Hamm.cn
 */
export class OauthCreateCodeRequest extends Transformer {
  /**
   * ### AppKey
   */
  appKey!: string

  /**
   * ### 授权范围
   */
  scope!: string
}
