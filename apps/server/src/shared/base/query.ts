import type { Command } from './command'

export interface Query<I, O> extends Command<I, O> {}
