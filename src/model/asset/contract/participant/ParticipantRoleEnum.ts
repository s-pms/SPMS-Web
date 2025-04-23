import { WebColor, WebEnum } from '@airpower/web'

export class ParticipantRoleEnum extends WebEnum {
  static readonly A = new ParticipantRoleEnum(1, '甲方')
    .setColor(WebColor.SUCCESS)

  static readonly B = new ParticipantRoleEnum(2, '乙方')
    .setColor(WebColor.WARNING)

  static readonly C = new ParticipantRoleEnum(3, '丙方')
    .setColor(WebColor.DANGER)

  static readonly D = new ParticipantRoleEnum(4, '丁方')
    .setColor(WebColor.NORMAL)
}
