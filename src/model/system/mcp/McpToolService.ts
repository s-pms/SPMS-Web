import {McpToolModel} from '@/model/system/mcp/McpToolModel'
import {AbstractService} from '@airpower/web'

export class McpToolService extends AbstractService {
  baseUrl = 'mcp'

  async getMcpTools(): Promise<McpToolModel[]> {
    const json = await this.api('getMcpTools').request()
    return McpToolModel.fromJsonArray(json)
  }
}
