import { WebColor, WebEnum } from '@airpower/web'

export class ParticipantTypeEnum extends WebEnum {
  static readonly OTHER = new ParticipantTypeEnum(0, '其他')
    .setColor(WebColor.NORMAL)

  static readonly PERSONAL = new ParticipantTypeEnum(1, '个人')
    .setColor(WebColor.SUCCESS)

  static readonly COMPANY = new ParticipantTypeEnum(2, '企业')
    .setColor(WebColor.DANGER)
}
