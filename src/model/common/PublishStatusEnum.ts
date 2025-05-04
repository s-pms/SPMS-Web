import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 发布状态
 * @author Hamm.cn
 */
export class PublishStatusEnum extends WebEnum<boolean> {
  static readonly YES = new PublishStatusEnum(true, '已发布')
    .setColor(WebColor.SUCCESS)

  static readonly NO = new PublishStatusEnum(false, '待发布')
    .setColor(WebColor.NORMAL)
}
