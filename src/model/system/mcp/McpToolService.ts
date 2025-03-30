import { McpToolModel } from '@/model/system/mcp/McpToolModel'
import { AirAbstractService } from '@airpower/base/AirAbstractService'

export class McpToolService extends AirAbstractService {
  baseUrl = 'mcp'

  async getMcpTools(): Promise<McpToolModel[]> {
    const json = await this.api('getMcpTools').post()
    return McpToolModel.fromJsonArray(json)
  }
}
