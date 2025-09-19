import { AbstractService } from '@airpower/web'
import { McpToolModel } from '@/model/system/mcp/McpToolModel'

export class McpToolService extends AbstractService {
  baseUrl = 'mcp'

  async getMcpTools(): Promise<McpToolModel[]> {
    return this.api('getMcpTools').requestModelList(undefined, McpToolModel)
  }
}
