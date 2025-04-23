import { WebColor, WebEnum } from '@airpower/web'

export class AlarmStatusEnum extends WebEnum {
  static readonly NONE = new AlarmStatusEnum(0, '正常运行')
    .setColor(WebColor.SUCCESS)

  static readonly SYSTEM = new AlarmStatusEnum(1, '系统报警')
    .setColor(WebColor.DANGER)

  static readonly MANUAL = new AlarmStatusEnum(2, '手动报警')
    .setColor(WebColor.WARNING)
}
