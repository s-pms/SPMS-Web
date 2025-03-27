import {
  Field, Form, Model, Search, Table,
} from '@airpower/decorator'
import { IPayload } from '@airpower/interface/IPayload'
import { BaseEntity } from '@/base/BaseEntity'
import { UnitEntity } from '@/model/system/unit/UnitEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'
import { MaterialUseTypeEnum } from '@/model/asset/material/MaterialUseTypeEnum'

@Model({
  label: '物料',
})
export class MaterialEntity extends BaseEntity implements IPayload {
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Search()
  @Field({
    label: '物料名称',
  }) name!: string

  @Table({
    copyField: true,
    forceShow: true,
  })
  @Search()
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '物料编码',
  }) code!: string

  @Table({
    showColor: true,
    width: 100,
  })
  @Form({
    clearable: false,
    defaultValue: MaterialTypeEnum.PRODUCT.key,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '物料类型',
    dictionary: MaterialTypeEnum,
  })
    materialType!: number

  @Table({
    showColor: true,
    width: 100,
  })
  @Form({
    clearable: false,
    defaultValue: MaterialUseTypeEnum.CONSUMABLE.key,
    requiredNumber: true,
  })
  @Search()
  @Field({
    label: '使用类型',
    dictionary: MaterialUseTypeEnum,
  })
    useType!: number

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
