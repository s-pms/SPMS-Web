import type { IPayload } from '@airpower/web'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'

/**
 * # 角色
 * @author Hamm.cn
 */

@Model({
  label: '角色',
})
export class RoleEntity extends BaseEntity implements IPayload {
  @Table({
    force: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '角色名称',
  })
  name!: string

  @Table({
    force: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '角色编码',
  })
  code!: string

  @Field({})
  @Type(MenuEntity, true)
  menuList!: MenuEntity[]

  @Field({})
  @Type(PermissionEntity, true)
  permissionList!: PermissionEntity[]

  @Table({
    removed: false,
  })
  @Search({
    hide: false,
  })
  declare isDisabled: boolean

  getPayloadLabel() {
    return this.name
  }
}
