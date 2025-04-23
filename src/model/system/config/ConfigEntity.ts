import { BaseEntity } from '@/base/BaseEntity'
import { BooleanYesNoDictionary } from '@/model/common/BooleanYesNoDictionary'
import { ConfigType } from '@/model/system/config/ConfigType'
import { Field, Form, Model, Search, Table } from '@airpower/web'

/**
 * # 参数配置实体
 *
 * @author Hamm.cn
 */
@Model({
  label: '配置',
})
export class ConfigEntity extends BaseEntity {
  @Search()
  @Table({
    nowrap: true,
    copy: true,
    order: 88,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置名称',
  })
  name!: string

  @Field({
    label: '配置描述',
  })
  description!: string

  @Search()
  @Table({
    nowrap: true,
    copy: true,
    width: 300,
    order: 99,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置标识',
  })
  flag!: string

  @Search()
  @Table({
    color: true,
    width: 100,
    order: 77,
  })
  @Form({
    requiredNumber: true,
    clearable: false,
    defaultValue: ConfigType.BOOLEAN.key,
  })
  @Field({
    label: '配置类型',
    dictionary: ConfigType,
  })
  type!: number

  @Table({
    color: true,
    width: 80,
    order: 66,
  })
  @Field({
    label: '系统配置',
    dictionary: BooleanYesNoDictionary,
  })
  isSystem!: boolean

  @Table()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置参数',
  })
  config!: string
}
