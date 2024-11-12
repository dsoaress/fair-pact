import type { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

export const Toaster = ({ ...props }: ToasterProps): JSX.Element => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      richColors={true}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
        }
      }}
      {...props}
    />
  )
}
