import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 配方类型枚举字典
 *
 * @author Hamm.cn
 */
export class BomTypeEnum extends AirEnum {
  static readonly NORMAL = new BomTypeEnum(1, '普通配方', AirColor.SUCCESS)

  static readonly OPERATION = new BomTypeEnum(2, '工序配方', AirColor.WARNING)
}
