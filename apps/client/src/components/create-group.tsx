import type { SyntheticEvent } from 'react'

import { useCreateGroup } from '@/hooks/use-create-group'
import type { CreateGroupProps } from '@/services/create-group'

export function CreateGroup(): JSX.Element {
  const { mutate } = useCreateGroup()

  function handleCreate(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      name: { value: string }
      currency: { value: CreateGroupProps['currency'] }
    }
    const name = formElements.name.value
    const currency = formElements.currency.value

    mutate({ name, currency })
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input className="border" type="text" name="name" placeholder="Nome" />
        <input className="border" type="text" name="currency" placeholder="Moeda" />
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}
