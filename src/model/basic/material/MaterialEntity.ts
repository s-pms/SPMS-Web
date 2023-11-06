import {
  Alias,
  ClassName,
  Dictionary, FieldName, ToModel, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { IJson } from '@/airpower/interface/IJson'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialType } from './MaterialType'
import { MaterialTypeDictionary } from './MaterialTypeDictionary'

/**
 * # 物料
 * @author Hamm
 */
@EntityConfig({
  // addTitle: '创建物料',
  // keywordSearchPlaceholder: '物料编码/名称搜索...',
})
@ClassName('物料')
export class MaterialEntity extends BaseEntity {
  /**
   * # 物料名称
   */
  @TableField({
    forceShow: true,
    copyField: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @Alias('name')
  @FieldName('物料名称') materialName!: string

  /**
   * # 规格型号
   */
  @TableField({
    emptyValue: '暂无信息',
  })
  @SearchField()
  @FormField()
  @Alias('spc')
  @FieldName('规格型号') materialSpc!: string

  /**
   * # 物料类型
   */
  @Dictionary(MaterialTypeDictionary)
  @TableField({
    showColor: true,
    width: 100,
  })
  @SearchField()
  @FormField({
    defaultValue: MaterialType.PUBLIC,
    requiredNumber: true,
  })
  @FieldName('物料类型') materialType!: MaterialType

  /**
   * # 单位ID
   */
  @ToModel((obj: IJson) => obj.unitId || obj.unitInfo?.id || undefined)
  @FieldName('单位ID')
    unitId = 1

  @TableField({
    orderNumber: 999,
    label: '重写的时间',
  })
  declare createTime: number
}
