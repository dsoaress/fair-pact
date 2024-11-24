import type { GetGroupByIdInputDTO } from '../dtos/get-group-by-id-input.dto'
import type { GetGroupByIdOutputDTO } from '../dtos/get-group-by-id-output.dto'
import type { GetGroupsInputDTO } from '../dtos/get-groups-input.dto'
import type { GetGroupsOutputDTO } from '../dtos/get-groups-output.dto'

export interface GroupsDAO {
  getGroupById({ id, memberId }: GetGroupByIdInputDTO): Promise<GetGroupByIdOutputDTO | null>
  getGroups({ memberId }: GetGroupsInputDTO): Promise<GetGroupsOutputDTO>
}
