import { AirColor } from '@/airpower/enum/AirColor'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 计划类型枚举字典
 *
 * @author Hamm.cn
 */
export class PlanTypeEnum extends AirEnum {
  static readonly INNER = new PlanTypeEnum(1, '内部计划', AirColor.NORMAL)

  static readonly SALE = new PlanTypeEnum(2, '外销计划', AirColor.SUCCESS)
}
