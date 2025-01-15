import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { IPayload } from '@/airpower/interface/IPayload'

/**
 * # 生产工艺
 * @author Hamm.cn
 */
@Model({
  label: '生产工艺',
})
export class RoutingEntity extends BaseEntity implements IPayload {
  @Table({
    forceShow: true,
    orderNumber: 88,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '工艺名称',
    type: String,
  })
    name!: string

  @Table({
    forceShow: true,
    orderNumber: 99,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '工艺编码',
    type: String,
  })
    code!: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: MaterialEntity,
  })
    material!: MaterialEntity

  @Table({
    copyField: true,
    orderNumber: 77,
  })
  @Field({
    label: '物料编码',
  })
    materialCode!: string

  @Table({
    orderNumber: 66,
    nowrap: true,
  })
  @Field({
    label: '物料名称',
  })
    materialName!: string

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: BomEntity,
  })
    bom!: BomEntity

  @Table({
    copyField: true,
    orderNumber: 55,
  })
  @Field({
    label: '配方编码',
  })
    bomCode!: string

  @Table({
    orderNumber: 44,
    nowrap: true,
  })
  @Field({
    label: '配方名称',
  })
    bomName!: string

  @Table({
    removed: false,
  })
  declare isPublished: boolean

  getPayloadLabel(): string {
    return this.name
  }
}
