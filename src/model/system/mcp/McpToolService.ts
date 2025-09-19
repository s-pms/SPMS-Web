import { AbstractService } from '@airpower/web'
import { McpToolModel } from '@/model/system/mcp/McpToolModel'

export class McpToolService extends AbstractService {
  baseUrl = 'mcp'

  async getMcpTools(): Promise<McpToolModel[]> {
    const json = await this.api('getMcpTools').requestRaw()
    return McpToolModel.fromJsonArray(json)
  }
}
