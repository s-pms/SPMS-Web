import type { IPayload } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { BooleanYesNoDictionary } from '@/model/common/BooleanYesNoDictionary'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { RoutingOperationEntity } from '@/model/mes/routing/operation/RoutingOperationEntity'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'

/**
 * # 生产工艺
 * @author Hamm.cn
 */
@Model({
  label: '生产工艺',
})
export class RoutingEntity extends BaseEntity implements IPayload {
  @Table({
    force: true,
    order: 88,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '工艺名称',
  })
  name!: string

  @Table({
    force: true,
    order: 99,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '工艺编码',
  })
  code!: string

  @Form({
    requiredPayload: true,
  })
  @Type(MaterialEntity)
  material!: MaterialEntity

  @Table({
    copy: true,
    order: 77,
  })
  @Field({
    label: '物料编码',
  })
  materialCode!: string

  @Table({
    order: 66,
  })
  @Field({
    label: '物料名称',
  })
  materialName!: string

  @Form({
    requiredPayload: true,
  })
  @Type(BomEntity)
  bom!: BomEntity

  @Table({
    copy: true,
    order: 55,
  })
  @Field({
    label: '配方编码',
  })
  bomCode!: string

  @Table({
    order: 44,
  })
  @Field({
    label: '配方名称',
  })
  bomName!: string

  @Table({
    removed: false,
  })
  @Search({
    hide: false,
  })
  declare isPublished: boolean

  @Form({
    requiredPayload: true,
  })
  @Field({})
  @Type(RoutingOperationEntity, true)
  details: RoutingOperationEntity[] = []

  @Field({
    label: '工艺配方',
    dictionary: BooleanYesNoDictionary,
  })
  @Form({
    defaultValue: BooleanYesNoDictionary.NO.key,
    clearable: false,
  })
  @Table({
    color: true,
    order: 22,
    width: 100,
  })
  isRoutingBom!: boolean

  getPayloadLabel(): string {
    return this.name
  }
}
