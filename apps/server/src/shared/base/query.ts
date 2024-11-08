import type { UseCase } from './use-case'

export interface Query<I, O> extends UseCase<I, O> {}
