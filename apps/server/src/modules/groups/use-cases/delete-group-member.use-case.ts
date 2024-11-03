import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import { type DeleteGroupMemberDto, DeleteGroupMemberSchema } from '../dtos/delete-group-member.dto'
import type { GroupMembersRepository } from '../repositories/group-members.repository'

export class DeleteGroupMemberUseCase implements UseCase<DeleteGroupMemberDto, Promise<void>> {
  constructor(private readonly groupMembersRepository: GroupMembersRepository) {}

  async execute(data: DeleteGroupMemberDto): Promise<void> {
    const parsedData = DeleteGroupMemberSchema.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error.format()._errors)

    const { groupId, userId } = parsedData.data

    const groupMember = await this.groupMembersRepository.findByGroupIdAndUserId(groupId, userId)
    if (!groupMember) throw new NotFoundException('Group Member')

    if (groupMember.balance)
      throw new BadRequestException(`Group member has balance of ${groupMember.balance}`)

    await this.groupMembersRepository.delete(groupId, userId)
  }
}
