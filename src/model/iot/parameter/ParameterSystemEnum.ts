import { WebColor, WebEnum } from '@airpower/web'

export class ParameterSystemEnum extends WebEnum<boolean> {
  static readonly DEFINE = new ParameterSystemEnum(false, '定义参数')
    .setColor(WebColor.NORMAL)

  static readonly SYSTEM = new ParameterSystemEnum(true, '系统参数')
    .setColor(WebColor.DANGER)
}
