import { WebColor, WebEnum } from '@airpower/web'

/**
 * # 工艺状态枚举字典
 *
 * @author Hamm.cn
 */
export class RoutingStatusEnum extends WebEnum {
  static readonly AUDITING = new RoutingStatusEnum(1, '审核中')
    .setColor(WebColor.WARNING)

  static readonly REJECTED = new RoutingStatusEnum(2, '已驳回')
    .setColor(WebColor.DANGER)

  static readonly PUBLISHED = new RoutingStatusEnum(3, '已发布')
    .setColor(WebColor.SUCCESS)
}
