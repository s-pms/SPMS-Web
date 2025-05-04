import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 开放应用加密方式
 * @author Hamm.cn
 */
export class OpenAppArithmeticEnum extends WebEnum {
  static readonly NO = new OpenAppArithmeticEnum(0, '明文')
    .setColor(WebColor.NORMAL)

  static readonly AES = new OpenAppArithmeticEnum(1, 'AES')
    .setColor(WebColor.WARNING)

  static readonly RSA = new OpenAppArithmeticEnum(2, 'RSA')
    .setColor(WebColor.SUCCESS)
}
