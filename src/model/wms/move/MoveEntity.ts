import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AbstractBaseBillEntity } from '@/base/bill/AbstractBaseBillEntity'
import { StorageEntity } from '@/model/factory/storage/StorageEntity'
import { MoveDetailEntity } from './MoveDetailEntity'
import { MoveStatus } from './MoveStatus'
import { MoveStatusDictionary } from './MoveStatusDictionary'

@ClassName('移库单')
export class MoveEntity extends AbstractBaseBillEntity<MoveDetailEntity> {
  @TableField({
    orderNumber: 99,
    forceShow: true,
  })
  @FormField({
    placeholder: '不填写按编码规则自动生成',
    orderNumber: 99,
  })
  @FieldName('移库单号') billCode!: string

  @TableField()
  @FieldName('目标存储资源') storageName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('目标存储资源')
  @Type(Number) storageId!: number

  @TableField({
    width: 100,
    showColor: true,
    orderNumber: -80,
    forceShow: true,
  })
  @Dictionary(MoveStatusDictionary)
  @FieldName('移库状态') status!: MoveStatus

  @FieldName('目标存储资源')
  @Type(StorageEntity) storage!: StorageEntity

  @FieldName('移库明细')
  @Type(MoveDetailEntity, true) details: MoveDetailEntity[] = []
}
