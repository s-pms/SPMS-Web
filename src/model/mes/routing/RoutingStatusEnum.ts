import { AirEnum } from '@airpower/base/AirEnum'
import { AirColor } from '@airpower/enum/AirColor'

/**
 * # 工艺状态枚举字典
 *
 * @author Hamm.cn
 */
export class RoutingStatusEnum extends AirEnum {
  static readonly AUDITING = new RoutingStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new RoutingStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PUBLISHED = new RoutingStatusEnum(3, '已发布', AirColor.SUCCESS)
}
