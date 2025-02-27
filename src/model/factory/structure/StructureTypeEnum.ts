import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

export class StructureTypeEnum extends AirEnum {
  static readonly SINGLE_STATION = new StructureTypeEnum(1, '单人工位', AirColor.SUCCESS)

  static readonly COMMON_WORK_AREA = new StructureTypeEnum(2, '公共工区', AirColor.WARNING)

  static readonly MULTI_STATION = new StructureTypeEnum(3, '多人工区', AirColor.WARNING)

  static readonly ROUND_WORK_AREA = new StructureTypeEnum(4, '轮用工区', AirColor.WARNING)
}
