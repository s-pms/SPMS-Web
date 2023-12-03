import {
  ClassName, Dictionary, FieldName,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { DeviceStatus } from './DeviceStatus'
import { DeviceStatusDictionary } from './DeviceStatusDictionary'
import { AlarmStatus } from './AlarmStatus'
import { AlarmStatusDictionary } from './AlarmStatusDictionary'

@ClassName('设备')
export class DeviceEntity extends BaseEntity {
  /**
   * # 设备名称
   */
  @TableField({
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @FieldName('设备名称') name!: string

  /**
   * # 设备编码
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    placeholder: '不输入按编码规则自动生成',
  })
  @FieldName('设备编码') code!: string

  /**
   * # 设备UUID
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    placeholder: '与采集端协商匹配后即可采集',
  })
  @FieldName('UUID') uuid!: string

  @TableField({
    copyField: true,
  })
  @FieldName('实时产量') partCount!: string

  @Dictionary(DeviceStatusDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -80,
  })
  @FieldName('运行状态') status!: DeviceStatus

  @Dictionary(AlarmStatusDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -80,
  })
  @FieldName('报警状态') alarm!: AlarmStatus
}
