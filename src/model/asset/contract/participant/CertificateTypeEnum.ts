import { ParticipantTypeEnum } from '@/model/asset/contract/participant/ParticipantTypeEnum'
import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

export class CertificateTypeEnum extends AirEnum {
  static readonly OTHER = new CertificateTypeEnum(0, '其他', AirColor.NORMAL)

  static readonly CHINESE_ID_CARD = new CertificateTypeEnum(1, '中国身份证', AirColor.SUCCESS, ParticipantTypeEnum.PERSONAL)

  static readonly PASSPORT = new CertificateTypeEnum(2, '护照', AirColor.SUCCESS, ParticipantTypeEnum.PERSONAL)

  static readonly HONGKONG_MACAO_PASSPORT = new CertificateTypeEnum(3, '港澳通行证', AirColor.WARNING, ParticipantTypeEnum.PERSONAL)

  static readonly TAIWAN_PASSPORT = new CertificateTypeEnum(4, '台湾通行证', AirColor.DANGER, ParticipantTypeEnum.PERSONAL)

  static readonly UNIFIED_CREDIT_CODE = new CertificateTypeEnum(5, '统一信用代码', AirColor.WARNING, ParticipantTypeEnum.COMPANY)

  type = ParticipantTypeEnum.OTHER

  constructor(key: number, label: string, color: AirColor, type = ParticipantTypeEnum.OTHER) {
    super(key, label, color)
    this.type = type
  }
}
