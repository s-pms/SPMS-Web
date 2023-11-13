import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { OrderDetailEntity } from './OrderDetailEntity'
import { OrderEntity } from './OrderEntity'

export class OrderService extends AbstractBaseBillService<OrderDetailEntity, OrderEntity> {
  entityClass = OrderEntity

  baseUrl = 'order'
}
