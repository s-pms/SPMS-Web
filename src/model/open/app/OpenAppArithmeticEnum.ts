/* eslint-disable no-unused-vars */

import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 开放应用加密方式
 * @author Hamm
 */
export class OpenAppArithmeticEnum extends AirEnum {
  static readonly AES = new OpenAppArithmeticEnum(1, 'AES', AirColor.WARNING)

  static readonly RSA = new OpenAppArithmeticEnum(2, 'RSA', AirColor.SUCCESS)

  static readonly NO = new OpenAppArithmeticEnum(3, '明文', AirColor.NORMAL)
}
