import { z } from "zod";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Posts ────────────────────────────────────────────────────────────────────

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export const updatePostSchema = createPostSchema.partial().extend({
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

// ─── Comments ─────────────────────────────────────────────────────────────────

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be under 1000 characters"),
  postId: z.string().min(1, "Invalid post ID"),
});

// ─── Categories ───────────────────────────────────────────────────────────────

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(50),
  slug: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .optional(),
});

// ─── Type exports ─────────────────────────────────────────────────────────────

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
