import { AirModel } from '@/airpower/base/AirModel'

/**
 * # Oauth 创建授权码 请求
 * @author Hamm.cn
 */
export class OauthCreateCodeRequest extends AirModel {
  /**
   * ### AppKey
   */
  appKey!: string

  /**
   * ### 授权范围
   */
  scope!: string
}
