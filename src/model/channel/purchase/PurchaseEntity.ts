import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { PurchaseStatusEnum } from './PurchaseStatusEnum'
import { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { AirEnum } from '@/airpower/base/AirEnum'

@Model('采购单')
export class PurchaseEntity extends AbstractBaseBillEntity<PurchaseDetailEntity> {
  @Field('采购单号') declare billCode: string

  @Table({
    nowrap: true,
  })
  @Form({
    textarea: true,
    maxLength: 80,
    requiredString: true,
  })
  @Field('采购事由') reason!: string

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field('总金额') totalPrice!: number

  @Table({
    width: 150,
    money: true,
    forceShow: true,
  })
  @Form({
    suffixText: '元',
  })
  @Field('实际金额') totalRealPrice!: number

  @Table({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(PurchaseStatusEnum)
  @Search()
  @Field('采购状态') status!: number

  @Field('采购明细')
  @Type(PurchaseDetailEntity, true) details: PurchaseDetailEntity[] = []

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
