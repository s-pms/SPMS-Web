import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'
import { ISelector } from '@/airpower/interface/ISelector'

@Model('物料')
export class MaterialEntity extends BaseEntity implements ISelector {
  /**
   * # 物料名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('物料名称') name!: string

  /**
   * # 物料编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('物料编码') code!: string

  /**
   * # 物料类型
   */
  @Table({
    showColor: true,
    width: 100,
  })
  @Form({
    clearable: false,
    defaultValue: MaterialTypeEnum.PRODUCT.key,
    requiredNumber: true,
  })
  @Dictionary(MaterialTypeEnum)
  @Field('物料类型') materialType!: number

  /**
   * # 规格型号
   */
  @Table({
    copyField: true,
  })
  @Form()
  @Field('规格型号') spc!: string

  @Table({
    payloadField: 'name',
    width: 100,
  })
  @Type(UnitEntity)
  @Form({
    requiredPayload: true,
  })
  @Field('计量单位') unit!: UnitEntity

  @Table({
    width: 150,
    money: true,
    hide: true,
  })
  @Form({
    number: true,
    defaultValue: 0,
    requiredNumber: true,
  })
  @Type(Number)
  @Field('采购单价') purchasePrice!: number

  @Table({
    width: 150,
    money: true,
    hide: true,
  })
  @Form({
    number: true,
    defaultValue: 0,
    requiredNumber: true,
  })
  @Type(Number)
  @Field('销售单价') salePrice!: number

  getSelectorLabel(): string {
    return `${this.name}(${this.code})`
  }
}
