import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { DeviceStatus } from './DeviceStatus'
import { DeviceStatusDictionary } from './DeviceStatusDictionary'
import { AlarmStatus } from './AlarmStatus'
import { AlarmStatusDictionary } from './AlarmStatusDictionary'
import { DeviceReportingDictionary } from './DeviceReportingDictionary'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'

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
    suffixText: 'Hello',
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
    orderNumber: -79,
    width: 80,
    showColor: true,
  })
  @FormField({
    defaultValue: true,
    clearable: false,
  })
  @Dictionary(DeviceReportingDictionary)
  @FieldName('开启采集') isReporting!: boolean

  @TableField({
    copyField: true,
    align: 'right',
  })
  @FieldName('实时产量') partCount!: string

  @Dictionary(DeviceStatusDictionary)
  @TableField({
    showColor: true,
    width: 80,
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

  @FormField({
    placeholder: '采集间隔毫秒数,最小200ms',
    requiredNumber: true,
    defaultValue: 200,
    number: true,
    min: 200,
    suffixText: 'ms',
  })
  @FieldName('采集频率') rate!: number

  @Type(ParameterEntity, true) parameters: ParameterEntity[] = []
}
