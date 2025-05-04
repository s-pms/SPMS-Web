import { Transformer } from '@airpower/web'

/**
 * # 第三方登录请求
 * @author Hamm.cn
 */
export class ThirdLoginRequest extends Transformer {
  code!: string

  platform!: string
}
