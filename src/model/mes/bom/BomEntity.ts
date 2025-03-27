import {
  Field, Form, Model, Search, Table,
} from '@airpower/decorator'
import { IPayload } from '@airpower/interface/IPayload'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomTypeEnum } from '@/model/mes/bom/BomTypeEnum'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * # 生产配方
 * @author Hamm.cn
 */

@Model({
  label: '生产配方',
})
export class BomEntity extends BaseEntity implements IPayload {
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '配方编码',
  })
    code!: string

  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配方名称',
  })
    name!: string

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: BomTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Field({
    label: '配方类型',
    dictionary: BomTypeEnum,
  })
  @Search()
    type!: number

  @Field({
    label: '配方明细',
    type: BomDetailEntity,
    array: true,
  })
    details: BomDetailEntity[] = []

  @Table({
    removed: false,
  })
  @Search({
    hide: false,
  })
  declare isPublished: boolean

  getPayloadLabel(): string {
    return this.name
  }
}
