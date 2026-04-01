// src/components/PostForm.tsx
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/shared/FormField'
import { useTranslation } from 'react-i18next'

export type PostFormValues = {
  title: string
  body: string
}

// `t` typing differs by i18n version; keep it loose here.
const createPostSchema = (t: any) =>
  z.object({
    title: z
      .string()
      .min(1, t('posts.validation.titleRequired', 'กรุณากรอกหัวข้อ'))
      .min(3, t('posts.validation.titleMin', 'หัวข้อต้องมีอย่างน้อย 3 ตัวอักษร'))
      .max(200, t('posts.validation.titleMax', 'หัวข้อต้องไม่เกิน 200 ตัวอักษร')),
    body: z
      .string()
      .min(1, t('posts.validation.bodyRequired', 'กรุณากรอกเนื้อหา'))
      .min(10, t('posts.validation.bodyMin', 'เนื้อหาต้องมีอย่างน้อย 10 ตัวอักษร'))
      .max(2000, t('posts.validation.bodyMax', 'เนื้อหาต้องไม่เกิน 2000 ตัวอักษร')),
  })

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>
  onSubmit: (values: PostFormValues) => void
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

export const PostForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: PostFormProps) => {
  const { t, i18n } = useTranslation()
  const postSchema = useMemo(() => createPostSchema(t), [i18n.language, t])
  const effectiveSubmitLabel = submitLabel ?? t('posts.save', 'Save')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      body: defaultValues?.body ?? '',
    },
  })

  useEffect(() => {
    if (defaultValues?.title !== undefined || defaultValues?.body !== undefined) {
      reset({
        title: defaultValues?.title ?? '',
        body: defaultValues?.body ?? '',
      })
    }
  }, [defaultValues?.title, defaultValues?.body, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="title"
        label={t('posts.form.titleLabel', 'Title')}
        error={errors.title?.message}
      >
        <Input
          id="title"
          placeholder={t('posts.form.titlePlaceholder', 'Enter post title...')}
          aria-invalid={!!errors.title}
          {...register('title')}
        />
      </FormField>

      <FormField
        id="body"
        label={t('posts.form.bodyLabel', 'Content')}
        error={errors.body?.message}
      >
        <Textarea
          id="body"
          placeholder={t('posts.form.bodyPlaceholder', 'Write your post content here...')}
          className="min-h-[160px] resize-y"
          aria-invalid={!!errors.body}
          {...register('body')}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('posts.saving', 'Saving...') : effectiveSubmitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset()
            onCancel()
          }}
          disabled={isLoading}
        >
          {t('posts.cancel', 'Cancel')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => reset()}
          disabled={isLoading}
          className="ml-auto text-muted-foreground"
        >
          {t('posts.reset', 'Reset')}
        </Button>
      </div>
    </form>
  )
}
