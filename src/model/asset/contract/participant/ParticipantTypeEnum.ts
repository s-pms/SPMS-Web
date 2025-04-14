import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class ParticipantTypeEnum extends AirEnum {
  static readonly OTHER = new ParticipantTypeEnum(0, '其他', AirColor.NORMAL)
  static readonly PERSONAL = new ParticipantTypeEnum(1, '个人', AirColor.SUCCESS)
  static readonly COMPANY = new ParticipantTypeEnum(2, '企业', AirColor.DANGER)
}
