import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class ParticipantRoleEnum extends AirEnum {
  static readonly A = new ParticipantRoleEnum(1, '甲方', AirColor.SUCCESS)
  static readonly B = new ParticipantRoleEnum(2, '乙方', AirColor.WARNING)
  static readonly C = new ParticipantRoleEnum(3, '丙方', AirColor.DANGER)
  static readonly D = new ParticipantRoleEnum(4, '丁方', AirColor.NORMAL)
}
