import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  username: z.string().min(2, 'Username must be at least 2 characters').max(50),
  email: z.string().email('Invalid email'),
  phone: z
    .string()
    .optional(),
  website: z.string().optional(),
})

export type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>
  onSubmit: (values: UserFormValues) => void
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

export const UserForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = 'Save',
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      username: defaultValues?.username ?? '',
      email: defaultValues?.email ?? '',
      phone: defaultValues?.phone ?? '',
      website: defaultValues?.website ?? '',
    },
  })

  useEffect(() => {
    if (!defaultValues) return
    reset({
      name: defaultValues.name ?? '',
      username: defaultValues.username ?? '',
      email: defaultValues.email ?? '',
      phone: defaultValues.phone ?? '',
      website: defaultValues.website ?? '',
    })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField id="name" label="Name" error={errors.name?.message}>
        <Input id="name" aria-invalid={!!errors.name} {...register('name')} />
      </FormField>

      <FormField id="username" label="Username" error={errors.username?.message}>
        <Input id="username" aria-invalid={!!errors.username} {...register('username')} />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input id="email" type="email" aria-invalid={!!errors.email} {...register('email')} />
      </FormField>

      <FormField id="phone" label="Phone" error={errors.phone?.message}>
        <Input id="phone" aria-invalid={!!errors.phone} {...register('phone')} />
      </FormField>

      <FormField id="website" label="Website" error={errors.website?.message}>
        <Input id="website" aria-invalid={!!errors.website} {...register('website')} />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => reset()}
          disabled={isLoading}
          className="ml-auto text-muted-foreground"
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
