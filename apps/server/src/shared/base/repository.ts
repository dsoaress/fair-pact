export interface Repository<Model> {
  findById?(id: string): Promise<Model | null>
  create?(model: Model): Promise<void>
  update?(model: Model): Promise<void>
  delete?(id: string): Promise<void>
}
