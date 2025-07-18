import { Field, Form, Model } from '@airpower/web'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@Model({
  label: '订单明细',
})
export class OrderDetailEntity extends AbstractBaseBillDetailEntity {
  quantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Field({
    label: '完成数量',
  })
  finishQuantity!: number

  @Form({
    requiredNumber: true,
    number: true,
  })
  @Field({
    label: '异常数量',
  })
  ngQuantity!: number
}
