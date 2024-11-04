import { GroupsController } from '../controllers/groups.controller'
import type { GroupMembersRepository } from '../repositories/group-members.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { CreateGroupUseCase } from '../use-cases/create-group.use-case'
import { DeleteGroupUseCase } from '../use-cases/delete-group.use-case'
import { UpdateGroupUseCase } from '../use-cases/update-group.use-case'

export function groupsFactory(
  groupsRepository: GroupsRepository,
  groupMembersRepository: GroupMembersRepository
): GroupsController {
  const createGroupUseCase = new CreateGroupUseCase(groupsRepository, groupMembersRepository)
  const updateGroupUseCase = new UpdateGroupUseCase(groupsRepository)
  const deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository)
  return new GroupsController(createGroupUseCase, updateGroupUseCase, deleteGroupUseCase)
}
