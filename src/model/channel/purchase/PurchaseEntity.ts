import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import type { WebEnum } from '@airpower/web'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'
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
    force: true,
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
    force: true,
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
    color: true,
    order: -80,
    force: true,
  })
  @Search()
  @Field({
    label: '采购状态',
    dictionary: PurchaseStatusEnum,
  })
  status!: number

  @Field({
    label: '采购明细',
  })
  @Type(PurchaseDetailEntity, true)
  details: PurchaseDetailEntity[] = []

  getAuditingStatus(): WebEnum {
    return PurchaseStatusEnum.AUDITING
  }

  getAuditedStatus(): WebEnum {
    return PurchaseStatusEnum.PURCHASING
  }

  getRejectedStatus(): WebEnum {
    return PurchaseStatusEnum.REJECTED
  }
}
