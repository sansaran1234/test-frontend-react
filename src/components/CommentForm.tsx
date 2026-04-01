import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'
import { useTranslation } from 'react-i18next'

export type CommentFormValues = {
  postId: number
  name: string
  email: string
  body: string
}

// `t` typing differs by i18n version; keep it loose here.
const createCommentSchema = (t: any) =>
  z.object({
    postId: z
      .number({ message: t('comments.validation.postIdRequired', 'กรุณาระบุ Post ID') })
      .int(t('comments.validation.postIdInt', 'Post ID ต้องเป็นจำนวนเต็ม'))
      .min(1, t('comments.validation.postIdMin', 'Post ID ต้องมากกว่าหรือเท่ากับ 1')),
    name: z
      .string()
      .min(1, t('comments.validation.nameRequired', 'กรุณากรอกชื่อ'))
      .min(2, t('comments.validation.nameMin', 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'))
      .max(200, t('comments.validation.nameMax', 'ชื่อต้องไม่เกิน 200 ตัวอักษร')),
    email: z
      .string()
      .min(1, t('comments.validation.emailRequired', 'กรุณากรอกอีเมล'))
      .email(t('comments.validation.emailFormat', 'รูปแบบอีเมลไม่ถูกต้อง')),
    body: z
      .string()
      .min(1, t('comments.validation.bodyRequired', 'กรุณากรอกเนื้อหา'))
      .min(5, t('comments.validation.bodyMin', 'เนื้อหาต้องมีอย่างน้อย 5 ตัวอักษร'))
      .max(2000, t('comments.validation.bodyMax', 'เนื้อหาต้องไม่เกิน 2000 ตัวอักษร')),
  })

interface CommentFormProps {
  defaultValues?: Partial<CommentFormValues>
  onSubmit: (values: CommentFormValues) => void
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

export const CommentForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: CommentFormProps) => {
  const { t, i18n } = useTranslation()
  const commentSchema = useMemo(() => createCommentSchema(t), [i18n.language, t])
  const effectiveSubmitLabel = submitLabel ?? t('comments.save', 'Save')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: defaultValues?.postId ?? 1,
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      body: defaultValues?.body ?? '',
    },
  })

  useEffect(() => {
    if (!defaultValues) return
    reset({
      postId: defaultValues.postId ?? 1,
      name: defaultValues.name ?? '',
      email: defaultValues.email ?? '',
      body: defaultValues.body ?? '',
    })
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="postId"
        label={t('comments.form.postIdLabel', 'Post ID')}
        error={errors.postId?.message}
      >
        <Input
          id="postId"
          type="number"
          inputMode="numeric"
          placeholder={t('comments.form.postIdPlaceholder', 'Enter post id...')}
          aria-invalid={!!errors.postId}
          {...register('postId', { valueAsNumber: true })}
          onWheel={(e) => {
            if (document.activeElement === e.currentTarget) {
              e.currentTarget.blur()
            }
          }}
        />
      </FormField>

      <FormField
        id="name"
        label={t('comments.form.nameLabel', 'Name')}
        error={errors.name?.message}
      >
        <Input
          id="name"
          placeholder={t('comments.form.namePlaceholder', 'Enter name...')}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
      </FormField>

      <FormField
        id="email"
        label={t('comments.form.emailLabel', 'Email')}
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder={t('comments.form.emailPlaceholder', 'Enter email...')}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField
        id="body"
        label={t('comments.form.bodyLabel', 'Body')}
        error={errors.body?.message}
      >
        <Textarea
          id="body"
          className="min-h-[160px] resize-y"
          placeholder={t('comments.form.bodyPlaceholder', 'Write comment here...')}
          aria-invalid={!!errors.body}
          {...register('body')}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('comments.saving', 'Saving...') : effectiveSubmitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          {t('comments.cancel', 'Cancel')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => reset()}
          disabled={isLoading}
          className="ml-auto text-muted-foreground"
        >
          {t('comments.reset', 'Reset')}
        </Button>
      </div>
    </form>
  )
}
