import { BaseEntity } from '@/base/BaseEntity'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { Field, Form, Model } from '@airpower/decorator'

/**
 * # 工序配置
 * @author Hamm.cn
 */
@Model({
  label: '工序配置',
})
export class RoutingOperationEntity extends BaseEntity {
  @Form({
    requiredPayload: true,
  })
  @Field({
    type: BomEntity,
  })
  bom!: BomEntity

  @Form({
    requiredPayload: true,
  })
  @Field({
    type: OperationEntity,
  })
  operation!: OperationEntity

  routingId!: number

  sortNo!: number

  isAutoNext!: boolean
}
