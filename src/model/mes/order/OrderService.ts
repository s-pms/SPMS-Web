import {AbstractBaseBillService} from '@/base/bill/AbstractBaseBillService'
import {FeedbackUtil} from '@airpower/web'
import type {OrderDetailEntity} from './OrderDetailEntity'
import {OrderEntity} from './OrderEntity'

export class OrderService extends AbstractBaseBillService<OrderDetailEntity, OrderEntity> {
  entityClass = OrderEntity

  baseUrl = 'order'

  async start(order: OrderEntity): Promise<void> {
    await this.api('start').request(order)
    FeedbackUtil.toastSuccess('订单开始生产成功')
  }

  async pause(order: OrderEntity): Promise<void> {
    await this.api('pause').request(order)
    FeedbackUtil.toastSuccess('订单暂停成功')
  }

  async addOrderDetail(order: OrderDetailEntity): Promise<void> {
    await this.api('addOrderDetail').request(order)
    FeedbackUtil.toastSuccess('订单报工成功')
  }
}
