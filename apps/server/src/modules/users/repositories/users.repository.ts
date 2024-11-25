import type { Repository } from '@/core/base/repository'

import type { UserModel } from '../models/user.model'

export interface UsersRepository extends Repository<UserModel> {
  findById(id: string): Promise<UserModel | null>
  createOrUpdate(model: UserModel): Promise<{ id: string }>
}
