import type { CurrencyDTO } from 'contracts'
import type { SyntheticEvent } from 'react'

import { useCreateGroup } from '@/hooks/use-create-group'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function CreateGroup(): JSX.Element {
  const { mutate } = useCreateGroup()

  function handleCreate(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      name: { value: string }
      currency: { value: CurrencyDTO }
    }
    const name = formElements.name.value
    const currency = formElements.currency.value
    mutate({ name, currency })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleCreate}>
      <Input className="border" type="text" name="name" placeholder="Nome" />
      <Input className="border" type="text" name="currency" placeholder="Moeda" />
      <Button type="submit">Criar</Button>
    </form>
  )
}
