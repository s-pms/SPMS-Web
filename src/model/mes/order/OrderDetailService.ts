import { AbstractBaseService } from '@/base/AbstractBaseService'
import { OrderDetailEntity } from './OrderDetailEntity'

export class OrderDetailService extends AbstractBaseService<OrderDetailEntity> {
  entityClass = OrderDetailEntity

  baseUrl = 'orderDetail'
}
