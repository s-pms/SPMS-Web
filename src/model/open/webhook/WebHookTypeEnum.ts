import { AirEnum } from '@/airpower/base/AirEnum'

export class WebHookTypeEnum extends AirEnum {
  static readonly WORK_WECHAT = new WebHookTypeEnum(1, '企业微信')

  static readonly FEI_SHU = new WebHookTypeEnum(2, '飞书')

  static readonly DING_TALK = new WebHookTypeEnum(3, '钉钉')

  static readonly EMAIL = new WebHookTypeEnum(4, '邮件')

  static readonly WEB_HOOK = new WebHookTypeEnum(5, 'WebHook')
}
