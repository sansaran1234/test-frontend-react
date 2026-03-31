import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'
import { useTranslation } from 'react-i18next'

export type UserFormValues = {
  name: string
  username: string
  email: string
  phone?: string
  website?: string
}

// `t` typing differs by i18n version; keep it loose here.
const createUserSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .min(1, t('users.validation.nameRequired', 'กรุณากรอกชื่อ'))
      .min(2, t('users.validation.nameMin', 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'))
      .max(100, t('users.validation.nameMax', 'ชื่อต้องไม่เกิน 100 ตัวอักษร')),
    username: z
      .string()
      .min(1, t('users.validation.usernameRequired', 'กรุณากรอกชื่อผู้ใช้'))
      .min(2, t('users.validation.usernameMin', 'ชื่อผู้ใช้ต้องมีอย่างน้อย 2 ตัวอักษร'))
      .max(50, t('users.validation.usernameMax', 'ชื่อผู้ใช้ต้องไม่เกิน 50 ตัวอักษร')),
    email: z
      .string()
      .min(1, t('users.validation.emailRequired', 'กรุณากรอกอีเมล'))
      .email(t('users.validation.emailFormat', 'รูปแบบอีเมลไม่ถูกต้อง')),
    phone: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === '' || /^\d+$/.test(val), {
        message: t('users.validation.phoneNumbersOnly', 'เบอร์โทรต้องเป็นตัวเลขเท่านั้น'),
      }),
    website: z.string().optional(),
  })

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
  submitLabel,
}: UserFormProps) => {
  const { t, i18n } = useTranslation()
  const userSchema = React.useMemo(() => createUserSchema(t), [i18n.language, t])
  const effectiveSubmitLabel = submitLabel ?? t('users.save', 'Save')

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

  React.useEffect(() => {
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
      <FormField
        id="name"
        label={t('users.form.nameLabel', 'Name')}
        error={errors.name?.message}
      >
        <Input
          id="name"
          placeholder={t('users.form.namePlaceholder', 'Enter name...')}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
      </FormField>

      <FormField
        id="username"
        label={t('users.form.usernameLabel', 'Username')}
        error={errors.username?.message}
      >
        <Input
          id="username"
          placeholder={t('users.form.usernamePlaceholder', 'Enter username...')}
          aria-invalid={!!errors.username}
          {...register('username')}
        />
      </FormField>

      <FormField
        id="email"
        label={t('users.form.emailLabel', 'Email')}
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder={t('users.form.emailPlaceholder', 'Enter email...')}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField
        id="phone"
        label={t('users.form.phoneLabel', 'Phone')}
        error={errors.phone?.message}
      >
        <Input
          id="phone"
          placeholder={t('users.form.phonePlaceholder', 'Enter phone number...')}
          aria-invalid={!!errors.phone}
          {...register('phone')}
        />
      </FormField>

      <FormField
        id="website"
        label={t('users.form.websiteLabel', 'Website')}
        error={errors.website?.message}
      >
        <Input
          id="website"
          placeholder={t('users.form.websitePlaceholder', 'Enter website...')}
          aria-invalid={!!errors.website}
          {...register('website')}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('users.saving', 'Saving...') : effectiveSubmitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          {t('users.cancel', 'Cancel')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => reset()}
          disabled={isLoading}
          className="ml-auto text-muted-foreground"
        >
          {t('users.reset', 'Reset')}
        </Button>
      </div>
    </form>
  )
}
