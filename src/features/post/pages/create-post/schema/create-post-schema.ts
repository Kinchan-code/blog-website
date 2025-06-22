import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Title must not be empty.' }),
  content: z.string().min(1, { message: 'Content must not be empty.' }),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
