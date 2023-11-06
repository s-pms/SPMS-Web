import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CodeRuleEntity } from './CodeRuleEntity'
import { CodeRuleTable } from './CodeRuleTable'
import { CodeRuleParam } from './CodeRuleParam'

/**
 * # 编码规则服务
 *
 * @author Hamm
 */
export class CodeRuleService extends AbstractBaseService<CodeRuleEntity> {
  baseUrl = 'coderule'

  entityClass = CodeRuleEntity

  async getTableList(): Promise<CodeRuleTable[]> {
    const jsonArray = await this.api('getTableList').post()
    return CodeRuleTable.fromJsonArray(jsonArray)
  }

  async getParamList(): Promise<CodeRuleParam[]> {
    const jsonArray = await this.api('getParamList').post()
    return CodeRuleParam.fromJsonArray(jsonArray)
  }
}
