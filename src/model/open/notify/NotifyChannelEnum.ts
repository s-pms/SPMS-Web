import { WebEnum } from '@airpower/web'

/**
 * # 通知渠道
 * @author Hamm.cn
 */
export class NotifyChannelEnum extends WebEnum {
  static readonly WORK_WECHAT = new NotifyChannelEnum(1, '企业微信')

  static readonly FEI_SHU = new NotifyChannelEnum(2, '飞书')

  static readonly DING_TALK = new NotifyChannelEnum(3, '钉钉')

  static readonly EMAIL = new NotifyChannelEnum(4, '邮件')

  static readonly WEB_HOOK = new NotifyChannelEnum(5, 'WebHook')
}
