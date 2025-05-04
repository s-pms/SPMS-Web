import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 入库状态枚举字典
 *
 * @author Hamm.cn
 */
export class InputStatusEnum extends WebEnum {
  static AUDITING = new InputStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static REJECTED = new InputStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static INPUTTING = new InputStatusEnum(3, '入库中')
    .setColor(WebColor.NORMAL)

  static DONE = new InputStatusEnum(4, '已完成')
    .setColor(WebColor.SUCCESS)
}
