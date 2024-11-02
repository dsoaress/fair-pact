import type { UseCase } from '@/shared/base/use-case'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import { NotFoundException } from '@/shared/exceptions/not-found.exception'
import { IdValueObject } from '@/shared/value-objects/id.value-object'

import type { CreateGroupTransactionDto } from '../dtos/create-group-transaction.dto'
import type { GroupTransactionModel } from '../models/group-transaction.model'
import type { GroupModel } from '../models/group.model'
import type { GroupTransactionsRepository } from '../repositories/group-transactions.respository'
import type { GroupsRepository } from '../repositories/groups.repository'
import { createGroupTransactionValidator } from '../validators/create-group-transaction.validator'

export class CreateGroupTransactionUseCase
  implements UseCase<CreateGroupTransactionDto, Promise<void>>
{
  constructor(
    private readonly groupsRepository: GroupsRepository,
    private readonly groupTransactionsRepository: GroupTransactionsRepository
  ) {}

  async execute(data: CreateGroupTransactionDto): Promise<void> {
    const parsedData = createGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) {
      console.log(parsedData.error)
      throw new BadRequestException(parsedData.error.format()._errors)
    }
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
    participants: CreateGroupTransactionDto['participants']
  ): void {
    const memberIds = group.members.map(member => member.value)
    console.log(memberIds)
    console.log(payerMemberId)
    const isValidMemberId =
      memberIds.includes(payerMemberId) &&
      memberIds.includes(createdBy) &&
      participants?.every(p => memberIds.includes(p.memberId))
    if (!isValidMemberId) throw new BadRequestException('Invalid member id')
  }

  private createGroupTransaction(data: CreateGroupTransactionDto): GroupTransactionModel {
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
      createdAt: new Date(),
      createdBy: IdValueObject.create(data.createdBy)
    }
  }
}