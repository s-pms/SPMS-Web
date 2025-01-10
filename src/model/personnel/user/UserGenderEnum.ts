import { AirEnum } from '@/airpower/base/AirEnum'

export class UserGenderEnum extends AirEnum {
  static MALE = new UserGenderEnum(1, '男')

  static FEMALE = new UserGenderEnum(0, '女')
}
