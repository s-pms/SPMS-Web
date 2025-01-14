import {
  Field, Form, Model, Search, Table,
} from '@/airpower/decorator'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'
import { BomTypeEnum } from '@/model/mes/bom/BomTypeEnum'
import { BomStatusEnum } from '@/model/mes/bom/BomStatusEnum'
import { AirEnum } from '@/airpower/base/AirEnum'

/**
 * # 生产配方
 * @author Hamm.cn
 */

@Model({
  label: '生产配方',
})
export class BomEntity extends AbstractBaseBillEntity<BomDetailEntity> {
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '配方编码',
  })
    billCode!: string

  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '配方名称',
  })
    name!: string

  @Table({
    width: 100,
    showColor: true,
  })
  @Form({
    defaultValue: BomTypeEnum.NORMAL.key,
    clearable: false,
    requiredNumber: true,
  })
  @Field({
    label: '配方类型',
    dictionary: BomTypeEnum,
  })
  @Search()
    type!: number

  @Table({
    width: 100,
    showColor: true,
  })
  @Field({
    label: '配方状态',
    dictionary: BomStatusEnum,
  })
    status!: number

  @Field({
    label: '配方明细',
    type: BomDetailEntity,
    array: true,
  })
    details: BomDetailEntity[] = []

  getAuditingStatus(): AirEnum {
    return BomStatusEnum.AUDITING
  }

  getAuditedStatus(): AirEnum {
    return BomStatusEnum.PUBLISHED
  }

  getRejectedStatus(): AirEnum {
    return BomStatusEnum.REJECTED
  }
}
