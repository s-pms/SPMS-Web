import {
  Dictionary, Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { Table } from '@/airpower/decorator/TableField'
import { DeviceStatusEnum } from './DeviceStatusEnum'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { Form } from '@/airpower/decorator/FormField'
import { DeviceReportingEnum } from '@/model/asset/device/DeviceReportingEnum'
import { AlarmStatusEnum } from '@/model/asset/device/AlarmStatusEnum'

@Model('设备')
export class DeviceEntity extends BaseEntity {
  /**
   * # 设备名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field('设备名称') name!: string

  /**
   * # 设备编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field('设备编码') code!: string

  /**
   * # 设备UUID
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '与采集端协商匹配后即可采集',
  })
  @Field('UUID') uuid!: string

  @Table({
    copyField: true,
    orderNumber: -79,
    width: 80,
    showColor: true,
  })
  @Form({
    defaultValue: true,
    clearable: false,
  })
  @Dictionary(DeviceReportingEnum)
  @Field('开启采集') isReporting!: boolean

  @Table({
    copyField: true,
    align: 'right',
  })
  @Field('实时产量') partCount!: string

  @Dictionary(DeviceStatusEnum)
  @Table({
    showColor: true,
    width: 80,
    orderNumber: -80,
  })
  @Field('运行状态') status!: number

  @Dictionary(AlarmStatusEnum)
  @Table({
    showColor: true,
    width: 100,
    orderNumber: -80,
  })
  @Field('报警状态') alarm!: number

  @Form({
    placeholder: '采集间隔毫秒数,最小200ms',
    requiredNumber: true,
    defaultValue: 200,
    number: true,
    min: 200,
    suffixText: 'ms',
  })
  @Field('采集频率') rate!: number

  @Type(ParameterEntity, true) parameters: ParameterEntity[] = []
}
