import { zodResolver } from '@hookform/resolvers/zod'
import type { CurrencyDTO } from 'contracts'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateGroup } from '@/hooks/use-create-group'

import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const CURRENCIES = [
  { code: 'BRL', name: 'Real brasileiro' },
  { code: 'USD', name: 'Dólar americano' },
  { code: 'EUR', name: 'Euro' }
]

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome do grupo deve ter no mínimo 3 caracteres.' })
    .max(255, { message: 'O nome do grupo deve ter no máximo 255 caracteres.' }),
  currency: z.string().length(3)
})

export function CreateGroupForm(): JSX.Element {
  const { mutateAsync } = useCreateGroup()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', currency: 'BRL' }
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    await mutateAsync({
      name: values.name,
      currency: values.currency as CurrencyDTO
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }): JSX.Element => (
            <FormItem>
              <FormLabel>Nome do grupo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Esse será o nome do seu grupo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }): JSX.Element => (
            <FormItem>
              <FormLabel>Moeda</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CURRENCIES.map(currency => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Especifique a moeda corrente do seu grupo.</FormDescription>
            </FormItem>
          )}
        />
        <DrawerFooter className="p-0">
          <Button disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Criar'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  )
}
