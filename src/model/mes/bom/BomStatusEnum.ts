import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 配方状态枚举字典
 *
 * @author Hamm.cn
 */
export class BomStatusEnum extends AirEnum {
  static readonly AUDITING = new BomStatusEnum(1, '审核中', AirColor.WARNING)

  static readonly REJECTED = new BomStatusEnum(2, '已驳回', AirColor.DANGER)

  static readonly PUBLISHED = new BomStatusEnum(3, '已发布', AirColor.SUCCESS)
}
