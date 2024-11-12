import { PlusCircle } from 'lucide-react'

import { CreateGroupForm } from './create-group-form'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './ui/drawer'

export function CreateGroup(): JSX.Element {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="link" aria-label="criar novo grupo" className="text-white">
          <PlusCircle />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Criar um grupo</DrawerTitle>
          <DrawerDescription>
            Adicione um novo grupo para organizar as finanças do seu grupo de amigos.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <CreateGroupForm />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
