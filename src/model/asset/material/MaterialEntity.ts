import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { MaterialTypeDictionary } from './MaterialTypeDictionary'
import { MaterialType } from './MaterialType'
import { UnitEntity } from '@/model/system/unit/UnitEntity'

@ClassName('物料')
export class MaterialEntity extends BaseEntity {
  /**
   * # 物料名称
   */
  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('物料名称') name!: string

  /**
   * # 物料编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('物料编码') code!: string

  /**
   * # 物料类型
   */
  @TableField({
    showColor: true,
    width: 100,
  })
  @FormField({
    clearable: false,
    defaultValue: MaterialType.PRODUCT,
    requiredNumber: true,
  })
  @Dictionary(MaterialTypeDictionary)
  @FieldName('物料类型') materialType!: MaterialType

  /**
   * # 规格型号
   */
  @TableField({
    copyField: true,
  })
  @FormField()
  @FieldName('规格型号') spc!: string

  @TableField({
    payloadField: 'name',
    width: 100,
  })
  @Type(UnitEntity)
  @FieldName('计量单位') unitInfo!: UnitEntity

  @FormField({
    requiredNumber: true,
  })
  @FieldName('单位ID') unitId!: number
}
