import { BaseEntity } from '@/base/BaseEntity'
import { AlarmStatusEnum } from '@/model/asset/device/AlarmStatusEnum'
import { DeviceReportingEnum } from '@/model/asset/device/DeviceReportingEnum'
import { DeviceStatusEnum } from '@/model/asset/device/DeviceStatusEnum'
import { ParameterEntity } from '@/model/iot/parameter/ParameterEntity'
import { Field, Form, Model, Table, Type } from '@airpower/web'

@Model({
  label: '设备',
})
export class DeviceEntity extends BaseEntity {
  /**
   * ### 设备名称
   */
  @Table({
    force: true,
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
    copy: true,
    force: true,
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
    copy: true,
    force: true,
  })
  @Form({
    placeholder: '与采集端协商匹配后即可采集',
  })
  @Field({
    label: 'UUID',
  })
  uuid!: string

  @Table({
    copy: true,
    order: -79,
    width: 80,
    color: true,
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
    copy: true,
    align: 'right',
  })
  @Field({
    label: '实时产量',
  })
  partCount!: string

  @Table({
    color: true,
    width: 80,
    order: -80,
  })
  @Field({
    label: '运行状态',
    dictionary: DeviceStatusEnum,
  })
  status!: number

  @Table({
    color: true,
    width: 100,
    order: -80,
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
  })
  @Type(ParameterEntity, true)
  parameters: ParameterEntity[] = []
}
