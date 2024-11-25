import type { Model } from '@/core/base/model'

export interface UserModel extends Omit<Model, 'createdBy'> {
  firstName: string
  lastName: string
  email: string
  avatar?: string
}
