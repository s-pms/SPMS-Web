import { BaseEntity } from '@/base/BaseEntity'
import { BomEntity } from '@/model/mes/bom/BomEntity'
import { OperationEntity } from '@/model/mes/operation/OperationEntity'
import { Form, Model, Type } from '@airpower/web'

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
  @Type(BomEntity)
  bom!: BomEntity

  @Form({
    requiredPayload: true,
  })
  @Type(OperationEntity)
  operation!: OperationEntity

  routingId!: number

  sortNo!: number

  isAutoNext!: boolean
}
