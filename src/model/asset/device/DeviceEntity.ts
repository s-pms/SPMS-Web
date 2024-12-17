import { BaseEntity } from '@/base/BaseEntity'
import { Table } from '@/airpower/decorator/TableField'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { Form } from '@/airpower/decorator/FormField'
import { DeviceReportingEnum } from '@/model/asset/device/DeviceReportingEnum'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'
import { DeviceStatusEnum } from '@/model/asset/device/DeviceStatusEnum'
import { AlarmStatusEnum } from '@/model/asset/device/AlarmStatusEnum'

@Model({
  label: '设备',
})
export class DeviceEntity extends BaseEntity {
  /**
   * ### 设备名称
   */
  @Table({
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '设备名称',
  })
    name!: string

  /**
   * ### 设备编码
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '不输入按编码规则自动生成',
  })
  @Field({
    label: '设备编码',
  })
    code!: string

  /**
   * ### 设备UUID
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    placeholder: '与采集端协商匹配后即可采集',
  })
  @Field({
    label: 'UUID',
  })
    uuid!: string

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
  @Field({
    label: '开启采集',
    dictionary: DeviceReportingEnum,
  })
    isReporting!: boolean

  @Table({
    copyField: true,
    align: 'right',
  })
  @Field({
    label: '实时产量',
  })
    partCount!: string

  @Table({
    showColor: true,
    width: 80,
    orderNumber: -80,
  })
  @Field({
    label: '运行状态',
    dictionary: DeviceStatusEnum,
  })
    status!: number

  @Table({
    showColor: true,
    width: 100,
    orderNumber: -80,
  })
  @Field({
    label: '报警状态',
    dictionary: AlarmStatusEnum,
  })
    alarm!: number

  @Form({
    placeholder: '采集间隔毫秒数,最小200ms',
    requiredNumber: true,
    defaultValue: 200,
    number: true,
    min: 200,
    suffixText: 'ms',
  })
  @Field({
    label: '采集频率',
  })
    rate!: number

  @Field({
    label: '参数',
    type: ParameterEntity,
    array: true,
  })
    parameters: ParameterEntity[] = []
}
