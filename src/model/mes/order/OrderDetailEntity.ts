import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'
import { Model } from '@/airpower/decorator/Model'

@Model({
  label: '订单明细',
})
export class OrderDetailEntity extends AbstractBaseBillDetailEntity {
  quantity!: number

  finishQuantity!: number
}
