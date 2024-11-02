import type { UseCase } from '@/shared/base/use-case'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupsRepository } from '../repositories/groups.repository'

type Input = {
  id: string
}

export class DeleteGroupUseCase implements UseCase<Input, Promise<void>> {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async execute({ id }: Input): Promise<void> {
    const groupExists = await this.groupsRepository.findById(id)
    if (!groupExists) throw new NotFoundException('Group')

    await this.groupsRepository.delete(id)
  }
}
