import { ClassName } from '@/airpower/decorator/Custom'
import { AbstractBaseBillDetailEntity } from '@/base/bill/detail/AbstractBaseBillDetailEntity'

@ClassName('订单明细')
export class OrderDetailEntity extends AbstractBaseBillDetailEntity {
  billId!: number
}
