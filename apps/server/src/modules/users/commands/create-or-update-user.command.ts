import {
  type CreateOrUpdateUserInputDto,
  type CreateOrUpdateUserOutputDto,
  IdValueObject,
  createGroupTransactionValidator
} from 'contracts'

import type { Command } from '@/shared/base/command'
import { BadRequestException } from '@/shared/exceptions/bad-request.exception'
import type { UsersRepository } from '../repositories/users.repository'

export class CreateOrUpdateUserCommand
  implements Command<CreateOrUpdateUserInputDto, Promise<CreateOrUpdateUserOutputDto>>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: CreateOrUpdateUserInputDto): Promise<CreateOrUpdateUserOutputDto> {
    const parsedData = createGroupTransactionValidator.safeParse(data)
    if (!parsedData.success) throw new BadRequestException(parsedData.error)
    return this.usersRepository.createOrUpdate({
      id: IdValueObject.create(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar,
      createdAt: new Date()
    })
  }
}
