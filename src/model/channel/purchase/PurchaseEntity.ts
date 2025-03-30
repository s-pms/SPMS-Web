import type { AirEnum } from '@airpower/base/AirEnum'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Field, Form, Model, Search, Table } from '@airpower/decorator'
import { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { PurchaseStatusEnum } from './PurchaseStatusEnum'

@Model({
  label: '采购单',
})
export class PurchaseEntity extends AbstractBaseBillEntity<PurchaseDetailEntity> {
  @Field({
    label: '采购单号',
  })
  declare billCode: string

  @Table({
    nowrap: true,
  })
  @Form({
    textarea: true,
    maxLength: 80,
    requiredString: true,
  })
  @Field({
    label: '采购事由',
  })
  reason!: string

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field({
    label: '总金额',
  })
  totalPrice!: number

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field({
    label: '实际金额',
  })
  totalRealPrice!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Search()
  @Field({
    label: '采购状态',
    dictionary: PurchaseStatusEnum,
  })
  status!: number

  @Field({
    label: '采购明细',
    type: PurchaseDetailEntity,
    array: true,
  })
  details: PurchaseDetailEntity[] = []

  getAuditingStatus(): AirEnum {
    return PurchaseStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return PurchaseStatusEnum.PURCHASING
  }

  getRejectedStatus(): AirEnum {
    return PurchaseStatusEnum.REJECTED
  }
}
