import type { OrderDetailEntity } from './OrderDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { AirNotification } from '@airpower/feedback/AirNotification'
import { OrderEntity } from './OrderEntity'

export class OrderService extends AbstractBaseBillService<OrderDetailEntity, OrderEntity> {
  entityClass = OrderEntity

  baseUrl = 'order'

  async start(order: OrderEntity): Promise<void> {
    await this.api('start').post(order)
    AirNotification.success('订单开始生产成功')
  }

  async pause(order: OrderEntity): Promise<void> {
    await this.api('pause').post(order)
    AirNotification.success('订单暂停成功')
  }

  async addOrderDetail(order: OrderDetailEntity): Promise<void> {
    await this.api('addOrderDetail').post(order)
    AirNotification.success('订单报工成功')
  }
}
