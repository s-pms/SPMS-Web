import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

export class BooleanYesNoDictionary extends AirEnum<boolean> {
  static readonly YES = new BooleanYesNoDictionary(true, '是', AirColor.SUCCESS)

  static readonly NO = new BooleanYesNoDictionary(false, '否', AirColor.NORMAL)
}
