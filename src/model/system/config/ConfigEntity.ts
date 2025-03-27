import {
  Field, Form, Model, Search, Table,
} from '@airpower/decorator'
import { BaseEntity } from '@/base/BaseEntity'
import { ConfigType } from '@/model/system/config/ConfigType'
import { BooleanYesNoDictionary } from '@/model/common/BooleanYesNoDictionary'

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
    copyField: true,
    orderNumber: 88,
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
    copyField: true,
    width: 300,
    orderNumber: 99,
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
    showColor: true,
    width: 100,
    orderNumber: 77,
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
    showColor: true,
    width: 80,
    orderNumber: 66,
  })
  @Field({
    label: '系统配置',
    type: Boolean,
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
