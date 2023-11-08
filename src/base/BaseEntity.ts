import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { AirEntity } from '@/airpower/base/AirEntity'
import { SearchField } from '@/airpower/decorator/SearchField'
import { AirSearchDataType } from '@/airpower/enum/AirSearchDataType'
import { DisableDictionary } from '@/model/common/DisableDictionary'

/**
 * # 数据库实体基类
 * @author Hamm
 */

@EntityConfig({
  addChildPermission: 'add',
})
@ClassName('记录')
export class BaseEntity extends AirEntity {
  @FieldName('创建时间')
  @TableField({
    width: 170,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @Type(Number) createTime!: number

  @FieldName('状态')
  @SearchField({
    orderNumber: -100,
  })
  @Dictionary(DisableDictionary)
  @TableField({
    showColor: true,
    width: 80,
    orderNumber: -100,
    removed: true,
  })
  @Type(Boolean) isDisabled!: boolean

  @FieldName('备注')
  @SearchField({
    orderNumber: -100,
    dataType: AirSearchDataType.TEXTAREA,
  })
  @FormField({
    textarea: true,
    orderNumber: -100,
  })
  @Type(String) remark!: string
}
