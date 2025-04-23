import { ParticipantTypeEnum } from '@/model/asset/contract/participant/ParticipantTypeEnum'
import { WebColor, WebEnum } from '@airpower/web'

export class CertificateTypeEnum extends WebEnum {
  static readonly OTHER = new CertificateTypeEnum(0, '其他')
    .setColor(WebColor.NORMAL)

  static readonly CHINESE_ID_CARD = new CertificateTypeEnum(1, '中国身份证')
    .setColor(WebColor.SUCCESS)
    .setType(ParticipantTypeEnum.PERSONAL)

  static readonly PASSPORT = new CertificateTypeEnum(2, '护照')
    .setColor(WebColor.SUCCESS)
    .setType(ParticipantTypeEnum.PERSONAL)

  static readonly HONGKONG_MACAO_PASSPORT = new CertificateTypeEnum(3, '港澳通行证')
    .setColor(WebColor.WARNING)
    .setType(ParticipantTypeEnum.PERSONAL)

  static readonly TAIWAN_PASSPORT = new CertificateTypeEnum(4, '台湾通行证')
    .setColor(WebColor.DANGER)
    .setType(ParticipantTypeEnum.PERSONAL)

  static readonly UNIFIED_CREDIT_CODE = new CertificateTypeEnum(5, '统一信用代码')
    .setColor(WebColor.WARNING)
    .setType(ParticipantTypeEnum.COMPANY)

  type = ParticipantTypeEnum.OTHER

  setType(type: ParticipantTypeEnum) {
    this.type = type
    return this
  }
}
