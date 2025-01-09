import { AirModel } from '@/airpower/base/AirModel'

/**
 * # 第三方登录请求
 * @author Hamm.cn
 */
export class ThirdLoginRequest extends AirModel {
  code!: string

  platform!: string
}
