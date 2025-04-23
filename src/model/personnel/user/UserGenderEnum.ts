import { WebEnum } from '@airpower/web'

export class UserGenderEnum extends WebEnum {
  static MALE = new UserGenderEnum(1, '男')

  static FEMALE = new UserGenderEnum(0, '女')
}
