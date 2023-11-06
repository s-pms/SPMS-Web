import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CodeRuleEntity } from './CodeRuleEntity'
import { CodeRuleField } from './CodeRuleField'
import { CodeRuleParam } from './CodeRuleParam'

/**
 * # 编码规则服务
 *
 * @author Hamm
 */
export class CodeRuleService extends AbstractBaseService<CodeRuleEntity> {
  baseUrl = 'coderule'

  entityClass = CodeRuleEntity

  async getFieldList(): Promise<CodeRuleField[]> {
    const jsonArray = await this.api('getFieldList').post()
    return CodeRuleField.fromJsonArray(jsonArray)
  }

  async getParamList(): Promise<CodeRuleParam[]> {
    const jsonArray = await this.api('getParamList').post()
    return CodeRuleParam.fromJsonArray(jsonArray)
  }
}
