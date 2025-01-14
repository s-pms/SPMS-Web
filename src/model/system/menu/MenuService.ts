import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MenuEntity } from './MenuEntity'

/**
 * # 菜单接口服务
 * @author Hamm.cn
 */
export class MenuService extends AbstractBaseService<MenuEntity> {
  baseUrl = 'menu'

  entityClass = MenuEntity
}
