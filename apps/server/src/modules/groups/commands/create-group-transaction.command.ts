import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { NotFoundException } from '@/core/exceptions/not-found.exception'

import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { CreateGroupTransactionDTO } from '../dtos/create-group-transaction.dto'
import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupModel } from '../models/group.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { createGroupTransactionValidator } from '../validators/create-group-transaction.validator'

export class CreateGroupTransactionCommand
  implements Command<CreateGroupTransactionDTO, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository
  ) {}

  async execute(data: CreateGroupTransactionDTO): Promise<void> {
    const parsedData = createGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    const { groupId, payerMemberId, participants, createdBy } = parsedData.data
    const group = await this.groupsRepository.findById(groupId)
    if (!group) throw new NotFoundException('Group')
    this.validateMembers(group, payerMemberId, createdBy, participants)
    await this.groupTransactionsRepository.create(this.createGroupTransaction(parsedData.data))
  }

  private validateMembers(
    group: GroupModel,
    payerMemberId: string,
    createdBy: string,
    participants: CreateGroupTransactionDTO['participants']
  ): void {
    const memberIds = group.members.map(member => member.value)
    const isValidMemberId =
      memberIds.includes(payerMemberId) &&
      memberIds.includes(createdBy) &&
      participants?.every(p => memberIds.includes(p.memberId))
    if (!isValidMemberId) throw new BadRequestException('Invalid member id')
  }

  private createGroupTransaction(data: CreateGroupTransactionDTO): GroupTransactionModel {
    return {
      id: IdValueObject.create(),
      name: data.name,
      amount: data.amount,
      groupId: IdValueObject.create(data.groupId),
      payerMemberId: IdValueObject.create(data.payerMemberId),
      participants: (data.participants ?? []).map(member => ({
        memberId: IdValueObject.create(member.memberId),
        amount: member.amount
      })),
      date: data.date,
      createdAt: new Date(),
      createdBy: IdValueObject.create(data.createdBy)
    }
  }
}
