import { GroupMembersController } from '../controllers/group-members.controller'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { CreateGroupMemberUseCase } from '../use-cases/create-group-member.use-case'
import { DeleteGroupMemberUseCase } from '../use-cases/delete-group-member.use-case'

export function groupMembersFactory(
  groupsRepository: GroupsRepository,
  groupMembersRepository: GroupMembersRepository
): GroupMembersController {
  const createGroupMemberUseCase = new CreateGroupMemberUseCase(
    groupsRepository,
    groupMembersRepository
  )
  const deleteGroupMemberUseCase = new DeleteGroupMemberUseCase(groupMembersRepository)
  return new GroupMembersController(createGroupMemberUseCase, deleteGroupMemberUseCase)
}
