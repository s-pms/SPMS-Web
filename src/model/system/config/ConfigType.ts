import { WebColor, WebEnum } from '@airpower/web'

export class ConfigType extends WebEnum {
  static readonly STRING = new ConfigType(0, '字符串')
    .setColor(WebColor.SUCCESS)

  static readonly BOOLEAN = new ConfigType(1, '布尔')
    .setColor(WebColor.WARNING)

  static readonly NUMBER = new ConfigType(2, '数字')
    .setColor(WebColor.DANGER)
}
