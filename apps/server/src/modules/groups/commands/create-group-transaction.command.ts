import {
  type CreateGroupTransactionDTO,
  IdValueObject,
  createGroupTransactionValidator
} from 'contracts'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'

import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupModel } from '../models/group.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.repository'
import type { GroupsRepository } from '../repositories/groups.repository'

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
    const { groupId, payerUserId, participants, createdBy } = parsedData.data
    const group = await this.groupsRepository.findById(groupId)
    if (!group) throw new NotFoundException('Group')
    this.validateMembers(group, payerUserId, createdBy, participants)
    await this.groupTransactionsRepository.create(this.createGroupTransaction(parsedData.data))
  }

  private validateMembers(
    group: GroupModel,
    payerUserId: string,
    createdBy: string,
    participants: CreateGroupTransactionDTO['participants']
  ): void {
    const userIds = group.members.map(member => member.value)
    const isValidUserId =
      userIds.includes(payerUserId) &&
      userIds.includes(createdBy) &&
      participants?.every(p => userIds.includes(p.userId))
    if (!isValidUserId) throw new BadRequestException('Invalid member id')
  }

  private createGroupTransaction(data: CreateGroupTransactionDTO): GroupTransactionModel {
    return {
      id: IdValueObject.create(),
      name: data.name,
      amount: data.amount,
      groupId: IdValueObject.create(data.groupId),
      payerUserId: IdValueObject.create(data.payerUserId),
      participants: (data.participants ?? []).map(member => ({
        userId: IdValueObject.create(member.userId),
        amount: member.amount
      })),
      date: data.date,
      createdAt: new Date(),
      createdBy: IdValueObject.create(data.createdBy)
    }
  }
}
