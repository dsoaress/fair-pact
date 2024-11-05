export interface Query<I, O> {
  execute(input: I): O
}
