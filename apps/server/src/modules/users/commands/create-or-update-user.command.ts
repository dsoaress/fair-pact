import type { Command } from '@/core/base/command'
import { BadRequestException } from '@/core/exceptions/bad-request.exception'
import { IdValueObject } from '@/core/value-objects/id.value-object'
import type { CreateOrUpdateUserInputDTO } from '../dtos/create-or-update-user-input.dto'
import type { CreateOrUpdateUserOutputDTO } from '../dtos/create-or-update-user-output.dto'
import type { UsersRepository } from '../repositories/users.repository'
import { createOrUpdateUserValidator } from '../validators/create-or-update-user.validator'

export class CreateOrUpdateUserCommand
  implements Command<CreateOrUpdateUserInputDTO, Promise<CreateOrUpdateUserOutputDTO>>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: CreateOrUpdateUserInputDTO): Promise<CreateOrUpdateUserOutputDTO> {
    const parsedData = createOrUpdateUserValidator.safeParse(data)
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
