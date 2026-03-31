// src/components/PostForm.tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/FormField'

const postSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  body: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(2000, 'Content must be less than 2000 characters'),
})

export type PostFormValues = z.infer<typeof postSchema>

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
  submitLabel = 'Save',
}: PostFormProps) => {
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

  // Sync defaultValues when editing (pre-fill from API)
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
      <FormField id="title" label="Title" error={errors.title?.message}>
        <Input
          id="title"
          placeholder="Enter post title..."
          aria-invalid={!!errors.title}
          {...register('title')}
        />
      </FormField>

      <FormField id="body" label="Content" error={errors.body?.message}>
        <Textarea
          id="body"
          placeholder="Write your post content here..."
          className="min-h-[160px] resize-y"
          aria-invalid={!!errors.body}
          {...register('body')}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
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
