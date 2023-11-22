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
  @TableField()
  @FormField({
    placeholder: '不填写按编码规则自动生成',
  })
  @FieldName('移库单号') billCode!: string

  @TableField()
  @FieldName('来源存储编码') fromStorageCode!: string

  @TableField()
  @FieldName('来源存储名称') fromStorageName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('来源存储资源')
  @Type(Number) fromStorageId!: number

  @TableField()
  @FieldName('目标存储编码') toStorageCode!: string

  @TableField()
  @FieldName('目标存储名称') toStorageName!: string

  @FormField({
    requiredNumber: true,
  })
  @FieldName('目标存储资源')
  @Type(Number) toStorageId!: number

  @TableField({
    width: 100,
    showColor: true,
    orderNumber: -80,
  })
  @Dictionary(MoveStatusDictionary)
  @FieldName('移库状态') status!: MoveStatus

  @FieldName('来源存储资源')
  @Type(StorageEntity) fromStorage!: StorageEntity

  @FieldName('目标存储资源')
  @Type(StorageEntity) toStorage!: StorageEntity

  @FieldName('移库明细')
  @Type(MoveDetailEntity, true) details: MoveDetailEntity[] = []
}
