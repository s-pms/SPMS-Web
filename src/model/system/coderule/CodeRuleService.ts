import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CodeRuleEntity } from './CodeRuleEntity'
import { CodeRuleField } from './CodeRuleField'
import { CodeRuleParam } from './CodeRuleParam'

/**
 * # 编码规则服务
 *
 * @author Hamm.cn
 */
export class CodeRuleService extends AbstractBaseService<CodeRuleEntity> {
  baseUrl = 'coderule'

  entityClass = CodeRuleEntity

  async getFieldList(): Promise<CodeRuleField[]> {
    return this.api('getFieldList')
      .requestArray(undefined, CodeRuleField)
  }

  async getParamList(): Promise<CodeRuleParam[]> {
    return this.api('getParamList')
      .requestArray(undefined, CodeRuleParam)
  }
}
