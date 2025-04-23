import { WebColor, WebEnum } from '@airpower/web'

export class BooleanYesNoDictionary extends WebEnum<boolean> {
  static readonly YES = new BooleanYesNoDictionary(true, '是')
    .setColor(WebColor.SUCCESS)

  static readonly NO = new BooleanYesNoDictionary(false, '否')
    .setColor(WebColor.NORMAL)
}
