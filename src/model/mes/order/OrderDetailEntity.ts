import { Model } from '@/airpower/decorator/Custom'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@Model('订单明细')
export class OrderDetailEntity extends AbstractBaseBillDetailEntity {
  quantity!: number

  finishQuantity!: number
}
