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
  @Table({
    copy: true,
    order: 88,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置名称',
  })
  @Search()
  name!: string

  @Field({
    label: '配置描述',
  })
  description!: string

  @Table({
    copy: true,
    width: 300,
    order: 99,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置标识',
  })
  flag!: string

  @Search({
    width: 120,
  })
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

  @Table({
    width: 200,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配置参数',
  })
  config!: string

  @Table({
    removed: true,
  })
  declare updateTime: number
}
