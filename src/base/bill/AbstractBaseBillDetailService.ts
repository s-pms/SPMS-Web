import type { AbstractBaseBillDetailEntity } from './detail/AbstractBaseBillDetailEntity'
import { AbstractBaseService } from '../AbstractBaseService'

/**
 * # 单据明细抽象服务基类
 *
 * @author Hamm.cn
 */
export abstract class AbstractBaseBillDetailService<
  D extends AbstractBaseBillDetailEntity,
> extends AbstractBaseService<D> {
}
