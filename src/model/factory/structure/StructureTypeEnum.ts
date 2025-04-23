import { WebColor, WebEnum } from '@airpower/web'

export class StructureTypeEnum extends WebEnum {
  static readonly SINGLE_STATION = new StructureTypeEnum(1, '单人工位')
    .setColor(WebColor.SUCCESS)

  static readonly COMMON_WORK_AREA = new StructureTypeEnum(2, '公共工区')
    .setColor(WebColor.WARNING)

  static readonly MULTI_STATION = new StructureTypeEnum(3, '多人工区')
    .setColor(WebColor.WARNING)

  static readonly ROUND_WORK_AREA = new StructureTypeEnum(4, '轮用工区')
    .setColor(WebColor.WARNING)
}
