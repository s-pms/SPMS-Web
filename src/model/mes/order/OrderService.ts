import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { OrderDetailEntity } from './OrderDetailEntity'
import { OrderEntity } from './OrderEntity'
import { AirNotification } from '@/airpower/feedback/AirNotification'

export class OrderService extends AbstractBaseBillService<OrderDetailEntity, OrderEntity> {
  entityClass = OrderEntity

  baseUrl = 'order'

  async start(order: OrderEntity): Promise<void> {
    await this.api('start')
      .post(order)
    AirNotification.success('订单开始生产成功')
  }

  async pause(order: OrderEntity): Promise<void> {
    await this.api('pause')
      .post(order)
    AirNotification.success('订单暂停成功')
  }
}
