import { GroupsController } from '../controllers/groups.controller'
import type { GroupsRepository } from '../repositories/groups.repository'
import { CreateGroupUseCase } from '../use-cases/create-group.use-case'
import { DeleteGroupUseCase } from '../use-cases/delete-group.use-case'
import { UpdateGroupUseCase } from '../use-cases/update-group.use-case'

export function groupsFactory(groupsRepository: GroupsRepository): GroupsController {
  const createGroupUseCase = new CreateGroupUseCase(groupsRepository)
  const updateGroupUseCase = new UpdateGroupUseCase(groupsRepository)
  const deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository)
  return new GroupsController(createGroupUseCase, updateGroupUseCase, deleteGroupUseCase)
}
