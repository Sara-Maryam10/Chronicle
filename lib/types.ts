// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = "USER" | "AUTHOR" | "ADMIN";
export type PostStatus = "DRAFT" | "PUBLISHED";

// ─── Core Models ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: Role;
  avatar?: string | null;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: Pick<User, "id" | "name" | "username" | "avatar">;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  status: PostStatus;
  authorId: string;
  author: Pick<User, "id" | "name" | "username" | "avatar">;
  categoryId?: string | null;
  category?: Category | null;
  publishedAt?: string | null;
  createdAt: string;
  comments?: Comment[];
}

// ─── API Payloads ─────────────────────────────────────────────────────────────

export interface PaginatedPosts {
  posts: Post[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  status: number;
}

// ─── Auth context ─────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: Role;
  avatar?: string | null;
}
