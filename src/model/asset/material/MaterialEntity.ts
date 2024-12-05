import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'
import { IPayload } from '@/airpower/interface/IPayload'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '物料',
})
export class MaterialEntity extends BaseEntity implements IPayload {
  /**
   * # 物料名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({}) name!: string

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
  @Field({}) code!: string

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
  @Field({
    label: '物料类型',
    dictionary: MaterialTypeEnum,
  })
    materialType!: number

  /**
   * # 规格型号
   */
  @Table({
    copyField: true,
  })
  @Form()
  @Field({
    label: '规格型号',
  })
    spc!: string

  @Table({
    payloadField: 'name',
    width: 100,
  })
  @Form({
    requiredPayload: true,
  })
  @Field({
    label: '计量单位',
    type: UnitEntity,
    alias: 'unitInfo',
  })
    unit!: UnitEntity

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
  @Field({
    label: '采购单价',
    type: Number,
  })
    purchasePrice!: number

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
  @Field({
    label: '销售单价',
    type: Number,
  })
    salePrice!: number

  getPayloadLabel(): string {
    return `${this.name}(${this.code})`
  }
}
