import type { DeleteGroupMemberDto } from '@fair-pact/contracts/groups/dtos/delete-group-member.dto'
import { deleteGroupMemberValidator } from '@fair-pact/contracts/groups/validators/delete-group-member.validator'

import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupMembersRepository } from '../repositories/group-members.repository'

export class DeleteGroupMemberUseCase implements UseCase<DeleteGroupMemberDto, Promise<void>> {
  constructor(private readonly groupMembersRepository: GroupMembersRepository) {}

  async execute(data: DeleteGroupMemberDto): Promise<void> {
    const parsedData = deleteGroupMemberValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)
    const { id } = parsedData.data
    const groupMember = await this.groupMembersRepository.findById(id)
    if (!groupMember) throw new NotFoundException('Group Member')
    await this.groupMembersRepository.delete(id)
  }
}
